package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.share.domain.entity.ShareImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareImageRepository extends JpaRepository<ShareImage, Long> {
    List<ShareImage> findByShareShareId(Long shareId);
}
