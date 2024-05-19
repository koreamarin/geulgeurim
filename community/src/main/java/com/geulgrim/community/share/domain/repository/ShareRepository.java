package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.share.application.dto.response.ShareImageResponse;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import com.geulgrim.community.share.application.dto.response.ShareResponse;
import com.geulgrim.community.share.domain.entity.Share;
import com.geulgrim.community.share.domain.entity.ShareImage;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long>, ShareCustomRepository {
    @Query("SELECT new com.geulgrim.community.share.application.dto.response.ShareListResponse(" +
            "s.shareId, u.userId, u.nickname, u.fileUrl, " +
            "s.title, s.hit, COUNT(c), s.createdAt, s.updatedAt) " +
            "FROM Share s " +
            "LEFT JOIN s.user u " +
            "LEFT JOIN s.commentList c " +
            "GROUP BY s.shareId, u.userId, u.nickname, u.fileUrl, s.title, s.hit, s.createdAt, s.updatedAt " +
            "ORDER BY s.createdAt DESC")
    List<ShareListResponse> findShareMainList(Pageable pageable);




    // 유저 아이디로 게시글 검색
    @Query("SELECT s.shareId, s.imageList, s.user.userId, s.title, s.hit, COUNT(c), s.createdAt, s.updatedAt " +
            "FROM Share s LEFT JOIN s.commentList c " +
            "WHERE s.user.userId = :userId " +
            "GROUP BY s.shareId")
    List<ShareListResponse> findSharesByUserId(Long userId);

    // 제목+내용으로 게시글 검색

    // 게시글 조회
    @Query("SELECT new com.geulgrim.community.share.application.dto.response.ShareResponse(" +
            "s.shareId, s.user.userId, s.user.nickname, s.user.fileUrl, s.title, s.content, s.hit, s.createdAt, s.updatedAt) " +
            "FROM Share s " +
            "WHERE s.shareId=:shareId " +
            "GROUP BY s.shareId")
    ShareResponse findByShareId(Long shareId);

    @Query("SELECT s FROM Share s where s.shareId=:shareId")
    Share findWithShareId(Long shareId);

    @Modifying
    @Transactional
    @Query("update Share s set s.hit = s.hit + 1 where s.shareId = :shareId")
    int updateView(Long shareId);

    void deleteByShareId(Long shareId);
}
