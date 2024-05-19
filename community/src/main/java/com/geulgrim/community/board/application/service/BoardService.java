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
import com.geulgrim.community.global.s3.AwsS3Service;
import com.geulgrim.community.global.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final AwsS3Service awsS3Service;
    private final BoardImageRepository boardImageRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final UserRepository userRepository;

    // 메인 페이지 신규글 목록
    public List<BoardListResponse> mainBoardNewList() {
        return boardRepository.findNewBoardResponseList();
    }

    // 메인 페이지 인기글 목록
    public List<BoardListResponse> mainBoardPopularList() {
        List<BoardListResponse> list = boardRepository.findBoardResponseList();
        List<BoardListResponse> newList = new ArrayList<>();
        for(BoardListResponse boardListResponse : list) {
            if(newList.size() >= 5) break;
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
        boardRepository.updateView(boardId);

        return BoardDetailResponse.builder()
                .board(boardRepository.findBoardByBoardId(boardId))
                .commentList(boardCommentRepository.findAllByBoardId(boardId))
                .imageList(boardImageRepository.findAllByBoardBoardId(boardId))
                .build();
    }

    // 게시판 작성
    public BoardDetailResponse writeBoard(long userId, BoardWriteRequest boardWriteRequest, List<MultipartFile> files) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<BoardImage> boardImageList = new ArrayList<>();
        for(MultipartFile image : files) {
            String url = awsS3Service.uploadFile(userId, image, timestamp, "board");
            BoardImage boardImage = new BoardImage();
            boardImage.setFileUrl(url);
            boardImage.setImageType(ImageType.URL);
//            log.info("URL : {}", boardImage.getFileUrl());
            boardImageList.add(boardImage);
        }

        Board board = boardRepository.save(
                Board.builder()
                .user(userRepository.findUserByUserId(userId))
                .title(boardWriteRequest.getTitle())
                .content(boardWriteRequest.getContent())
                .imageList(boardImageList)
                .build()
        );

        for(BoardImage boardImage : boardImageList) {
            boardImage.setBoard(board);
            boardImageRepository.save(boardImage);
        }

        return boardDetail(board.getBoardId());
    }

    // 게시글 삭제
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }


    // 게시글 수정
    public BoardDetailResponse modifyBoard(long userId, BoardUpdateRequest boardUpdateRequest, List<MultipartFile> files) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<BoardImage> boardImageList = new ArrayList<>();
        for(MultipartFile image : files) {
            String url = awsS3Service.uploadFile(userId, image, timestamp, "board");
            BoardImage boardImage = new BoardImage();
            boardImage.setFileUrl(url);
            boardImage.setImageType(ImageType.URL);
//            log.info("URL : {}", boardImage.getFileUrl());
            boardImageList.add(boardImage);
        }

        Board board = boardRepository.save(
                Board.builder()
                .boardId(boardUpdateRequest.getBoardId())
                .user(userRepository.findUserByUserId(userId))
                .title(boardUpdateRequest.getTitle())
                .content(boardUpdateRequest.getContent())
                .imageList(boardImageList)
                .build()
        );


        for(BoardImage boardImage : boardImageList) {
            boardImage.setBoard(board);
            boardImageRepository.save(boardImage);
        }
        return boardDetail(board.getBoardId());
    }

    public Page<BoardListResponse> searchBoards(String keyword, String searchType, String sort, Pageable pageable) {
        if (keyword == null || searchType == null) {
            return boardRepository.findBoardResponseList(pageable);
        }
        return boardRepository.searchBoards(keyword, searchType, sort, pageable);
    }

    public Page<BoardListResponse> myBoards(long userId, String keyword, String searchType, String sort, Pageable pageable) {
        if (keyword == null || searchType == null) {
            return boardRepository.myBoards(userId, pageable);
        }
        return boardRepository.myBoards(userId, keyword, searchType, sort, pageable);
    }
}
