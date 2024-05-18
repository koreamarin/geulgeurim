package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.application.dto.response.CrewListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CrewCustomRepository {
    Page<CrewListResponse> searchCrews(String keyword, String searchType, String sort, Pageable pageable);
    Page<CrewListResponse> findCrewResponseList(Pageable pageable);
}
