package com.geulgrim.community.crew.domain.repository;


import com.geulgrim.community.crew.domain.entity.CrewRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewRequestRepository extends JpaRepository<CrewRequest, Long> {


    List<CrewRequest> findByCrew_CrewId(Long crewId);

    CrewRequest findByCrewRequestId(Long crewRequestId);


    @Query("SELECT cr FROM CrewRequest cr LEFT JOIN FETCH cr.user u WHERE cr.user.userId = :userId AND cr.crew.crewId = :crewId")
    CrewRequest findByUserIdAndCrewId(Long userId, Long crewId);

}
