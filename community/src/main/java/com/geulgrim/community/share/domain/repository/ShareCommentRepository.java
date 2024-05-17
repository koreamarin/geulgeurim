package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.share.domain.entity.ShareComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareCommentRepository extends JpaRepository<ShareComment, Long> {

    @Query("SELECT sc FROM ShareComment sc WHERE sc.share.shareId = :shareId")
    List<ShareComment> findAllByShareId(Long shareId);

    void deleteShareCommentByShareCommentId(Long shareCommentId);
}
