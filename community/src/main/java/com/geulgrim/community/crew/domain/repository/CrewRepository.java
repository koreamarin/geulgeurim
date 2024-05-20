package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.application.dto.response.CrewListResponse;
import com.geulgrim.community.crew.application.dto.response.MyCrewListResponse;
import com.geulgrim.community.crew.domain.entity.Crew;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewRepository extends JpaRepository<Crew, Long>, CrewCustomRepository {
}
