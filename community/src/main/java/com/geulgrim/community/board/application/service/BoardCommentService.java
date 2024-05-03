package com.geulgrim.community.board.application.service;

import com.geulgrim.community.board.application.dto.request.BoardCommentUpdateRequest;
import com.geulgrim.community.board.application.dto.request.BoardCommentWriteRequest;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardComment;
import com.geulgrim.community.board.domain.repository.BoardCommentRepository;
import com.geulgrim.community.board.domain.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardCommentService {

    private final BoardRepository boardRepository;
    private final BoardCommentRepository boardCommentRepository;

    // 작성
    public List<BoardComment> writeComment(BoardCommentWriteRequest boardCommentWriteRequest) {
        Board board = boardRepository.findByBoardId(boardCommentWriteRequest.getBoardId());
        // 유저 아이디 수정
        long userId = 1;
        BoardComment boardComment = BoardComment.builder()
                .content(boardCommentWriteRequest.getContent())
                .board(board)
                .build();
        boardCommentRepository.save(boardComment);
        return boardCommentRepository.findAllByBoardId(boardCommentWriteRequest.getBoardId());
    }

    // 조회
    public List<BoardComment> commentList(long boardId) {
        return boardCommentRepository.findAllByBoardId(boardId);
    }

    // 수정
    public BoardComment modifyComment(long boardCommentId, BoardCommentUpdateRequest boardCommentUpdateRequest) {
        Board board = boardRepository.findByBoardId(boardCommentUpdateRequest.getBoardId());

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
}
