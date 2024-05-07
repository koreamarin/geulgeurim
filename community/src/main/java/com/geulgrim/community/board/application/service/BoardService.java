package com.geulgrim.community.board.application.service;

import com.geulgrim.community.board.application.dto.request.BoardUpdateRequest;
import com.geulgrim.community.board.application.dto.request.BoardWriteRequest;
import com.geulgrim.community.board.application.dto.response.BoardDetailResponse;
import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardImage;
import com.geulgrim.community.board.domain.entity.enums.ImageType;
import com.geulgrim.community.board.domain.repository.BoardCommentRepository;
import com.geulgrim.community.board.domain.repository.BoardImageRepository;
import com.geulgrim.community.board.domain.repository.BoardRepository;
import com.geulgrim.community.global.file.entity.FileUrl;
import com.geulgrim.community.global.file.repository.FileUrlRepository;
import com.geulgrim.community.global.s3.AwsS3Service;
import com.geulgrim.community.global.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final FileUrlRepository fileUrlRepository;
    private final AwsS3Service awsS3Service;
    private final BoardImageRepository boardImageRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final UserRepository userRepository;

    // 메인 페이지 신규글 목록
    public List<BoardListResponse> mainBoardPopularList() {
        List<BoardListResponse> list = boardRepository.findBoardResponseList();
        return list.subList(0, 6);
    }

    // 메인 페이지 인기글 목록
    public List<BoardListResponse> mainBoardNewList() {
        List<BoardListResponse> list = boardRepository.findBoardResponseList();
        List<BoardListResponse> newList = new ArrayList<BoardListResponse>();
        for(BoardListResponse boardListResponse : list) {
            if(newList.size() >= 6) break;
            if(boardListResponse.getHit() + boardListResponse.getCommentCnt() >= 50) {
                newList.add(boardListResponse);
            }
        }
        return newList;
    }

    // 자유게시판 전체 조회
    public List<BoardListResponse> boardList() {
        return boardRepository.findBoardResponseList();
    }

    // 자유게시판 상세조회
    public BoardDetailResponse boardDetail(long boardId) {
        return BoardDetailResponse.builder()
                .board(boardRepository.findByBoardId(boardId))
                .commentList(boardCommentRepository.findAllByBoardId(boardId))
                .urlList(fileUrlRepository.findFileUrlByBoardId(boardId))
                .build();
    }

    // 게시판 작성
    public Board writeBoard(long userId, BoardWriteRequest boardWriteRequest) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<BoardImage> boardImageList = new ArrayList<>();
        for(MultipartFile image : boardWriteRequest.getImageList()) {
            String url = awsS3Service.uploadFile(userId, image, timestamp, "board");
            FileUrl fileUrl = new FileUrl();
            log.info("URL : {}", fileUrl.getFileUrl());
            BoardImage boardImage = new BoardImage();
            fileUrl.setFileUrl(url);
            boardImage.setFileUrl(fileUrlRepository.save(fileUrl));
            boardImageList.add(boardImage);
        }

        Board board = Board.builder()
                .user(userRepository.findUserByUserId(userId))
                .title(boardWriteRequest.getTitle())
                .content(boardWriteRequest.getContent())
                .imageList(boardImageList)
                .build();

        board = boardRepository.save(board);
        for(BoardImage boardImage : boardImageList) {
            boardImage.setBoard(board);
            boardImage.setImageType(ImageType.URL);
            boardImageRepository.save(boardImage);
        }

        return board;
    }

    // 게시글 삭제
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }


    // 게시글 수정
    public Board modifyBoard(long userId, BoardUpdateRequest boardUpdateRequest) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<BoardImage> boardImageList = new ArrayList<>();
        for(MultipartFile image : boardUpdateRequest.getImageList()) {
            String url = awsS3Service.uploadFile(userId, image, timestamp, "board");
            FileUrl fileUrl = new FileUrl();
            BoardImage boardImage = new BoardImage();
            fileUrl.setFileUrl(url);
            boardImage.setFileUrl(fileUrlRepository.save(fileUrl));
            boardImageList.add(boardImage);
        }

        Board board = Board.builder()
                .user(userRepository.findUserByUserId(userId))
                .title(boardUpdateRequest.getTitle())
                .content(boardUpdateRequest.getContent())
                .imageList(boardImageList)
                .build();

        return boardRepository.save(board);
    }
}
