package com.geulgrim.common.crew.domain.repository;

import com.geulgrim.common.crew.domain.entity.CrewRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewRequestRepository extends JpaRepository<CrewRequest, Long> {


    List<CrewRequest> findByCrew_CrewId(Long crewId);
}
