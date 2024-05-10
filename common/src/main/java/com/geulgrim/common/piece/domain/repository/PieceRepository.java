package com.geulgrim.common.piece.domain.repository;

import com.geulgrim.common.piece.domain.entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.*;
import java.util.ArrayList;
import java.util.Optional;

public interface PieceRepository extends JpaRepository<Piece, Long> {

    // 회원의 소유 작품 전체 조회
    ArrayList<Piece> findAllByOwnerId(Long ownerId);

    // 작품 상세조회
    Optional<Piece> findByPieceId(Long pieceId);
}
