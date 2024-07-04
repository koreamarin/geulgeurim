package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Resume;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long>{
    Optional<Resume> findByResumeId(Long resumeId);

    List<Resume> findByUserIdAndResumeTitleContaining(Long userId, String title, Sort sort);

    List<Resume> findByUserIdAndEssayContaining(Long userId, String essay, Sort sort);

    List<Resume> findByUserId(Long userId, Sort sort);
}
