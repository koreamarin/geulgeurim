package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}
