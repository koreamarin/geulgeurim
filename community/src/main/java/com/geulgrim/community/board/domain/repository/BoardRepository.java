package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.application.dto.response.BoardResponse;
import com.geulgrim.community.board.domain.entity.Board;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, BoardCustomRepository {
    // 게시글 전체 리스트 조회
    @Query("SELECT new com.geulgrim.community.board.application.dto.response.BoardListResponse(" +
            "b.boardId, b.user.userId, b.user.nickname, b.title, b.hit, COUNT(c), b.createdAt, b.updatedAt) " +
            "FROM Board b " +
            "LEFT JOIN b.commentList c " +
            "GROUP BY b.boardId, b.user.userId, b.user.nickname, b.title, b.hit, b.createdAt, b.updatedAt " +
            "ORDER BY b.createdAt DESC")
    List<BoardListResponse> findBoardResponseList();

    @Query("SELECT new com.geulgrim.community.board.application.dto.response.BoardListResponse(" +
            "b.boardId, b.user.userId, b.user.nickname, b.title, b.hit, COUNT(c), b.createdAt, b.updatedAt) " +
            "FROM Board b LEFT JOIN b.commentList c " +
            "GROUP BY b.boardId ORDER BY b.createdAt DESC LIMIT 5")
    List<BoardListResponse> findNewBoardResponseList();

    @Query("SELECT new com.geulgrim.community.board.application.dto.response.BoardListResponse(" +
            "b.boardId, b.user.userId, b.user.nickname, b.title, b.hit, COUNT(c), b.createdAt, b.updatedAt) " +
            "FROM Board b LEFT JOIN b.commentList c " +
            "GROUP BY b.boardId ORDER BY b.createdAt DESC LIMIT 5")
    List<BoardListResponse> findRecentBoardResponseList();

    // 유저 아이디로 게시글 검색
    @Query("SELECT new com.geulgrim.community.board.application.dto.response.BoardListResponse(" +
            "b.boardId, b.user.userId, b.user.nickname, b.title, b.hit, COUNT(c), b.createdAt, b.updatedAt) " +
            "FROM Board b LEFT JOIN b.commentList c " +
            "WHERE b.user.userId = :userId " +
            "GROUP BY b.boardId")
    List<BoardListResponse> findBoardsByUserId(Long userId);

    // 제목+내용으로 게시글 검색

    // 게시글 조회
    @Query("SELECT new com.geulgrim.community.board.application.dto.response.BoardResponse(" +
            "b.boardId, b.user.userId, b.user.nickname, b.user.fileUrl, b.title, b.content, b.hit, b.createdAt, b.updatedAt) " +
            "FROM Board b " +
            "WHERE b.boardId=:boardId " +
            "GROUP BY b.boardId")
    BoardResponse findBoardByBoardId(Long boardId);

    @Query("SELECT b FROM Board b where b.boardId=:boardId")
    Board findBoardWithBoardId(Long boardId);

    @Modifying
    @Transactional
    @Query("update Board b set b.hit = b.hit + 1 where b.boardId = :boardId")
    int updateView(Long boardId);

    void deleteByBoardId(Long boardId);
}
