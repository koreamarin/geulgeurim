package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT j FROM Job j " +
            "JOIN j.jobPositions jp " +
            "ON jp.position.positionId " +
            "IN :positionIds " +
            "WHERE j.experienceType IN :experienceTypes " +
            "AND j.closeType IN :closeTypes")
    List<Job> getJobs(
            @Param("positionIds") List<Long> positionIds,
            @Param("experienceTypes") List<String> experienceTypes,
            @Param("closeTypes") List<String> closeType
    );

    Optional<Job> findBySaraminId(Long saraminId);

    Optional<Job> findByJobId(Long jobId);
}
