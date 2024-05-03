package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.domain.entity.CrewImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface CrewImageRepository extends JpaRepository<CrewImage, Long> {

    ArrayList<CrewImage> findByCrew_CrewId(Long crewId);
}
