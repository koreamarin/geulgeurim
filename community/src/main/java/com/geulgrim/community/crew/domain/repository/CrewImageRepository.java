package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.domain.entity.CrewImage;
import com.geulgrim.community.share.domain.entity.ShareImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface CrewImageRepository extends JpaRepository<CrewImage, Long> {

    ArrayList<CrewImage> findByCrew_CrewId(Long crewId);

    @Query("SELECT c FROM CrewImage c WHERE c.crew.crewId IN :crewIds")
    List<CrewImage> findImagesByCrewIds(@Param("crewIds") List<Long> crewIds);
}
