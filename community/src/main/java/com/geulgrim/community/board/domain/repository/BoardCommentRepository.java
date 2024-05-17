package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.application.dto.response.BoardCommentResponse;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

    @Query("SELECT new com.geulgrim.community.board.application.dto.response.BoardCommentResponse(" +
            "bc.boardCommentId, bc.user.userId, bc.user.nickname, bc.user.fileUrl, bc.content, bc.board.boardId, " +
            "bc.createdAt, bc.updatedAt) FROM BoardComment bc LEFT JOIN bc.user u " +
            "WHERE bc.board.boardId = :boardId ORDER BY bc.createdAt DESC")
    List<BoardCommentResponse> findAllByBoardId(long boardId);

    List<BoardComment> findAllByBoard(Board board);

    void deleteBoardCommentByBoardCommentId(long boardCommentId);
}
