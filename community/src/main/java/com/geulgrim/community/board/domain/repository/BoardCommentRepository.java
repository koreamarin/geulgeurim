package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.domain.entity.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

    @Query("SELECT bc FROM BoardComment bc LEFT JOIN bc.board b GROUP BY bc.board.boardId")
    List<BoardComment> findAllByBoardId(long boardId);

    void deleteBoardCommentByBoardCommentId(long boardCommentId);
}
