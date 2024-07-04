package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.FirstLocate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FirstLocateRepository extends JpaRepository<FirstLocate, Long>{

    Optional<FirstLocate> findByFirstLocateKey(Long firstLocateKey);
}
