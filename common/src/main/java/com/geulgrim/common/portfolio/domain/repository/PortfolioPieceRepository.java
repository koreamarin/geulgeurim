package com.geulgrim.common.portfolio.domain.repository;

import com.geulgrim.common.portfolio.domain.entity.PortfolioPiece;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface PortfolioPieceRepository extends JpaRepository<PortfolioPiece, Long> {


    ArrayList<PortfolioPiece> findAllByPortfolio_PofolId(Long pofolId);
}
