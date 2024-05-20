package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecondLocateRepository extends JpaRepository<SecondLocate, Long> {
    Optional<SecondLocate> findBySecondLocateKey(Long secondLocateKey);
}
