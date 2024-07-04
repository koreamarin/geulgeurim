package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Position;
import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.ResumePosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumePositionRepository extends JpaRepository<ResumePosition, Long> {
    Optional<List<ResumePosition>> findByResume(Resume resume);
    Optional<ResumePosition> findByResumeAndPosition(Resume resume, Position position);
}
