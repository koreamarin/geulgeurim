package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.application.dto.response.BoardResponse;
import com.geulgrim.community.board.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    // 게시글 전체 리스트 조회
    @Query("SELECT b.boardId, b.userId, b.title, b.hit, b.createdAt, b.updatedAt, COUNT(c) " +
            "FROM Board b LEFT JOIN b.commentList c " +
            "GROUP BY b.boardId")
    List<BoardResponse> findBoardResponseList();

    // 유저 아이디로 게시글 검색
    @Query("SELECT b.boardId, b.userId, b.title, b.hit, b.createdAt, b.updatedAt, COUNT(c) " +
            "FROM Board b LEFT JOIN b.commentList c " +
            "WHERE b.userId = :userId " +
            "GROUP BY b.boardId")
    List<BoardResponse> findBoardsByUserId(Long userId);

    // 제목+내용으로 게시글 검색

    // 게시글 조회
    Board findByBoardId(Long boardId);

    void deleteByBoardId(Long boardId);
}
