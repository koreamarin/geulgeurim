package com.geulgrim.common.piece.domain.repository;

import com.geulgrim.common.piece.domain.entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PieceRepository extends JpaRepository<Piece, Long> {
}
