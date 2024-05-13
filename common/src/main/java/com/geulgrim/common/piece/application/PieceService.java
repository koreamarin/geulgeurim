package com.geulgrim.common.piece.application;

import com.geulgrim.common.piece.application.dto.request.PieceCreateRequestDto;
import com.geulgrim.common.piece.application.dto.response.PieceResponseDto;
import com.geulgrim.common.piece.application.dto.response.PieceSearchResponseDto;
import com.geulgrim.common.piece.domain.PieceSearchType;
import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;
import com.geulgrim.common.piece.exception.NoPieceExistException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PieceService {

    private static final Logger log = LoggerFactory.getLogger(PieceService.class);
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

    public void create(PieceCreateRequestDto dto) {
        pieceRepository.save(dto.toEntity());
    }

    public List<PieceSearchResponseDto> findAllPiece(Long userId, String condition, String keyWord, String sortBy){

        List<Piece> pieces = null;

        log.info("userId:{}, condition: {}, keyWord:{}, sortBy:{}", userId, condition, keyWord, sortBy);

        try{
            PieceSearchType pieceSearchType = PieceSearchType.valueOf(condition.toUpperCase());
            pieces = pieceSearchType.getListByPieceSearchType(pieceRepository, userId, keyWord);
        } catch (Exception e){
            throw new NoPieceExistException();
        }

        return pieces.stream()
                .map(PieceSearchResponseDto::from)
                .toList();
    }

    public void deletePiece(Long id) {

        Piece piece = pieceRepository.findById(id).orElseThrow(NoPieceExistException::new);
        if (piece != null) {
            try {
                pieceRepository.delete(piece);
            }catch (Exception e){
                throw new NoPieceExistException();
            }
        }
    }


}
