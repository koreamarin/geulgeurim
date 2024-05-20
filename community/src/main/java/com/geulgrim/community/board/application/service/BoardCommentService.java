package com.geulgrim.community.board.application.service;

import com.geulgrim.community.board.application.dto.request.BoardCommentUpdateRequest;
import com.geulgrim.community.board.application.dto.request.BoardCommentWriteRequest;
import com.geulgrim.community.board.application.dto.response.BoardCommentResponse;
import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.application.dto.response.BoardResponse;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardComment;
import com.geulgrim.community.board.domain.repository.BoardCommentRepository;
import com.geulgrim.community.board.domain.repository.BoardRepository;
import com.geulgrim.community.global.user.domain.entity.User;
import com.geulgrim.community.global.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardCommentService {

    private final BoardRepository boardRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final UserRepository userRepository;

    // 작성
    public List<BoardCommentResponse> writeComment(long userId, BoardCommentWriteRequest boardCommentWriteRequest) {
        Board board = boardRepository.findBoardWithBoardId(boardCommentWriteRequest.getBoardId());
        User user = userRepository.findUserByUserId(userId);
        // 유저 아이디 수정
        BoardComment boardComment = BoardComment.builder()
                .content(boardCommentWriteRequest.getContent())
                .user(user)
                .board(board)
                .build();
        boardCommentRepository.save(boardComment);
        return boardCommentRepository.findAllByBoardId(boardCommentWriteRequest.getBoardId());
    }

    // 조회
    public List<BoardCommentResponse> commentList(long boardId) {
        return boardCommentRepository.findAllByBoardId(boardId);
    }

    // 수정
    public BoardComment modifyComment(long boardCommentId, BoardCommentUpdateRequest boardCommentUpdateRequest) {
        Board board = boardRepository.findBoardWithBoardId(boardCommentUpdateRequest.getBoardId());

        BoardComment boardComment = BoardComment.builder()
                .boardCommentId(boardCommentId)
                .content(boardCommentUpdateRequest.getContent())
                .board(board)
                .build();
        boardCommentRepository.save(boardComment);
        return boardComment;
    }

    // 삭제
    public void deleteComment(long boardCommentId) {
        boardCommentRepository.deleteBoardCommentByBoardCommentId(boardCommentId);
    }

    public Page<BoardCommentResponse> myComments(long userId, String keyword, String sort, Pageable pageable) {
        if (keyword == null) {
            return boardRepository.myComments(userId, pageable);
        }
        return boardRepository.myComments(userId, keyword, sort, pageable);
    }
}
