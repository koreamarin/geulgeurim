package com.geulgrim.common.piece.application;

import com.geulgrim.common.piece.application.dto.response.PieceResponseDto;
import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;
import com.geulgrim.common.piece.exception.NoPieceExistException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class PieceService {

    private final PieceRepository pieceRepository;

    public PieceResponseDto findById(Long id) {
        Piece piece = pieceRepository.findById(id).orElseThrow(NoPieceExistException::new);
        return PieceResponseDto.builder()
                .id(piece.getId())
                .ownerId(piece.getOwnerId())
                .fileUrl(piece.getFileUrl())
                .name(piece.getName())
                .description(piece.getDescription())
                .type(piece.getType())
                .build();
    }

}
