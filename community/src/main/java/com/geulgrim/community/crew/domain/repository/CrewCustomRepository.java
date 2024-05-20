package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.application.dto.response.CrewListResponse;
import com.geulgrim.community.crew.application.dto.response.MyApplyListResponse;
import com.geulgrim.community.crew.application.dto.response.MyCrewListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CrewCustomRepository {
    Page<CrewListResponse> searchCrews(String keyword, String searchType, String sort, Pageable pageable);
    Page<CrewListResponse> findCrewResponseList(Pageable pageable);
    Page<MyCrewListResponse> findMyCrewResponseList(long userId, Pageable pageable);
    Page<MyApplyListResponse> findMyApplyResponseList(long userId, Pageable pageable);
}
