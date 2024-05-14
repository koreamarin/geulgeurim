package com.geulgrim.common.piece.domain.repository;

import com.geulgrim.common.piece.domain.entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface PieceRepository extends JpaRepository<Piece, Long> {

    // 회원의 소유 작품 전체 조회
    ArrayList<Piece> findAllByOwnerId(Long ownerId);

    // 작품 상세조회
    Optional<Piece> findById(Long pieceId);

    // 작품 조건 검색
    List<Piece> findByOwnerIdAndNameContaining(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndDescriptionContaining(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndNameContainingOrDescriptionContaining(Long ownerId, String name, String description);

    List<Piece> findByOwnerIdAndNameContainingOrderByUpdatedAt(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndDescriptionContainingOrderByUpdatedAt(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAt(Long ownerId, String name, String description);

    List<Piece> findByOwnerIdAndNameContainingOrderByUpdatedAtDesc(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndDescriptionContainingOrderByUpdatedAtDesc(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(Long ownerId, String name, String description);
}
