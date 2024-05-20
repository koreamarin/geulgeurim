package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long>{
    Optional<List<Work>> findByResume(Resume resume);
}
