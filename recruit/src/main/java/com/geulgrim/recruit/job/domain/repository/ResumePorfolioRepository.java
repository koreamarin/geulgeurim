package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.ResumePortfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumePorfolioRepository extends JpaRepository<ResumePortfolio, Long>{
    Optional<List<ResumePortfolio>> findByResume(Resume resume);
    Optional<ResumePortfolio> findByResumeAndPofolId(Resume resume, Long pofolId);
    Optional<List<ResumePortfolio>> findByPofolId(Long pofolId);
}
