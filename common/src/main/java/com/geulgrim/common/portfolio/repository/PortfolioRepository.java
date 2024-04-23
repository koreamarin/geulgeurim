package com.geulgrim.common.portfolio.repository;

import com.geulgrim.common.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    @Query("SELECT p FROM Portfolio p WHERE p.user.userId = :userId")
    List<Portfolio> findAllByUserId(Long userId);
}
