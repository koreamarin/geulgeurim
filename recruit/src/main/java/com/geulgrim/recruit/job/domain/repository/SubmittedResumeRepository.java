package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Job;
import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.SubmittedResume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmittedResumeRepository extends JpaRepository<SubmittedResume, Long> {
    Optional<SubmittedResume> findByJobAndResume(Job job, Resume resume);
    Optional<List<SubmittedResume>> findByJob(Job job);
    Optional<List<SubmittedResume>> findByResume(Resume resume);
}
