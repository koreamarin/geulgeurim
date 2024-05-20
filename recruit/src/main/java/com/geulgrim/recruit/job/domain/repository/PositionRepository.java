package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.domain.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long>{
    Optional<Position> findByPositionId(Long positionId);
}
