package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import com.geulgrim.community.share.domain.entity.Share;
import com.geulgrim.community.share.domain.entity.ShareImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    @Query("SELECT new com.geulgrim.community.share.application.dto.response.ShareListResponse(" +
            "s.shareId, u.userId, u.nickname, u.fileUrl, " +
            "s.title, s.hit, COUNT(c), s.createdAt, s.updatedAt) " +
            "FROM Share s " +
            "LEFT JOIN s.user u " +
            "LEFT JOIN s.commentList c " +
            "GROUP BY s.shareId, u.userId, u.nickname, u.fileUrl, s.title, s.hit, s.createdAt, s.updatedAt " +
            "ORDER BY s.createdAt DESC LIMIT 5")
    List<ShareListResponse> findShareResponseList();

    @Query("SELECT si FROM ShareImage si WHERE si.share.shareId IN :shareIds")
    List<ShareImage> findImagesByShareIds(@Param("shareIds") List<Long> shareIds);

    // 유저 아이디로 게시글 검색
    @Query("SELECT s.shareId, s.imageList, s.user.userId, s.title, s.hit, COUNT(c), s.createdAt, s.updatedAt " +
            "FROM Share s LEFT JOIN s.commentList c " +
            "WHERE s.user.userId = :userId " +
            "GROUP BY s.shareId")
    List<ShareListResponse> findSharesByUserId(Long userId);

    // 제목+내용으로 게시글 검색

    // 게시글 조회
    Share findByShareId(Long shareId);

    void deleteByShareId(Long shareId);
}
