package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Job;
import com.geulgrim.recruit.job.domain.entity.JobPosition;
import com.geulgrim.recruit.job.domain.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobPositionRepository extends JpaRepository<JobPosition, Long> {
    Optional<List<JobPosition>> findByJob(Job job);

    Optional<JobPosition> findByJobAndPosition(Job job, Position position);

}
