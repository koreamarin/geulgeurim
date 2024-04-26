package com.geulgrim.common.portfolio.domain.repository;

import com.geulgrim.common.portfolio.domain.entity.PortfolioFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface PortfolioFileRepository extends JpaRepository<PortfolioFile, Long> {

    ArrayList<PortfolioFile> findAllByPortfolio_PofolId(Long pofolId);
}
