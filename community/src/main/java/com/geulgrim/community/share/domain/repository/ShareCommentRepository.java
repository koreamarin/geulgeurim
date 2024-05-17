package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.share.application.dto.response.ShareCommentResponse;
import com.geulgrim.community.share.domain.entity.ShareComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareCommentRepository extends JpaRepository<ShareComment, Long> {

    @Query("SELECT new com.geulgrim.community.share.application.dto.response.ShareCommentResponse(" +
            "sc.shareCommentId, sc.user.userId, sc.user.nickname, sc.user.fileUrl, sc.content, sc.share.shareId, " +
            "sc.createdAt, sc.updatedAt) FROM ShareComment sc LEFT JOIN sc.user u " +
            "WHERE sc.share.shareId = :shareId ORDER BY sc.createdAt DESC")
    List<ShareCommentResponse> findAllByShareId(Long shareId);

    void deleteShareCommentByShareCommentId(Long shareCommentId);
}
