package com.geulgrim.common.piece.domain.repository;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
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

    // without type order by update
    List<Piece> findByOwnerIdAndNameContainingOrderByUpdatedAt(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndDescriptionContainingOrderByUpdatedAt(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAt(Long ownerId, String name, String description);

    // without type order by update desc
    List<Piece> findByOwnerIdAndNameContainingOrderByUpdatedAtDesc(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndDescriptionContainingOrderByUpdatedAtDesc(Long ownerId, String keyword);

    List<Piece> findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(Long ownerId, String name, String description);

    // with type order by update
    List<Piece> findByOwnerIdAndTypeAndNameContainingOrderByUpdatedAt(Long ownerId, PieceType type, String keyword);

    List<Piece> findByOwnerIdAndTypeAndDescriptionContainingOrderByUpdatedAt(Long ownerId, PieceType type, String keyword);

    List<Piece> findByOwnerIdAndTypeAndNameContainingOrDescriptionContainingOrderByUpdatedAt(Long ownerId, PieceType type, String name, String description);

    // with type order by update desc
    List<Piece> findByOwnerIdAndTypeAndNameContainingOrderByUpdatedAtDesc(Long ownerId, PieceType type, String name);

    List<Piece> findByOwnerIdAndTypeAndDescriptionContainingOrderByUpdatedAtDesc(Long ownerId, PieceType type, String keyword);

    List<Piece> findByOwnerIdAndTypeAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(Long ownerId, PieceType type, String name, String description);
}
