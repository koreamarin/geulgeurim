package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Job;
import com.geulgrim.recruit.job.domain.entity.Star;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StarRepository extends JpaRepository<Star, Long>{
    Optional<Star> findByJobAndUserId(Job job, Long userId);
    Optional<List<Star>> findByUserId(Long userId);
}
