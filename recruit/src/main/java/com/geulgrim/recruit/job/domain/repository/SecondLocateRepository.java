package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecondLocateRepository extends JpaRepository<SecondLocate, Long> {
    Optional<SecondLocate> findBySecondLocateKey(Long secondLocateKey);
}
