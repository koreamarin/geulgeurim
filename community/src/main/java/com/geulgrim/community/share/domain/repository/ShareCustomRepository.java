package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ShareCustomRepository {
    Page<ShareListResponse> searchShares(String keyword, String searchType, String sort, Pageable pageable);
    Page<ShareListResponse> findShareResponseList(Pageable pageable);
}
