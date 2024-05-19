package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.share.application.dto.response.ShareImageResponse;
import com.geulgrim.community.share.domain.entity.ShareImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareImageRepository extends JpaRepository<ShareImage, Long> {
    List<ShareImage> findByShareShareId(Long shareId);

    @Query("SELECT new com.geulgrim.community.share.application.dto.response.ShareImageResponse(" +
            "si.shareImageId, si.fileUrl) FROM ShareImage si WHERE si.share.shareId =:shareId")
    List<ShareImageResponse> findShareImageResponseByShareIds(@Param("shareId") long shareId);
}
