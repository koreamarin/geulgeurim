package com.geulgrim.common.piece.application;

import com.geulgrim.common.global.s3.S3UploadService;
import com.geulgrim.common.piece.application.dto.request.PieceCreateRequestDto;
import com.geulgrim.common.piece.application.dto.response.PieceResponseDto;
import com.geulgrim.common.piece.application.dto.response.PieceSearchResponseDto;
import com.geulgrim.common.piece.domain.PieceSearchOrderType;
import com.geulgrim.common.piece.domain.PieceSearchType;
import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import com.geulgrim.common.piece.domain.repository.PieceRepository;
import com.geulgrim.common.piece.exception.NoPieceExistException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PieceService {

    private static final Logger log = LoggerFactory.getLogger(PieceService.class);
    private final PieceRepository pieceRepository;
    private final S3UploadService s3UploadService;

    public PieceResponseDto findById(Long id) {
        Piece piece = pieceRepository.findById(id).orElseThrow(NoPieceExistException::new);
        return PieceResponseDto.builder()
                .id(piece.getId())
                .ownerId(piece.getOwnerId())
                .fileUrl(piece.getFileUrl())
                .name(piece.getName())
                .description(piece.getDescription())
                .pieceType(piece.getType())
                .nftType(piece.getNftType())
                .status(piece.getStatus())
                .createdAt(piece.getCreatedAt())
                .updatedAt(piece.getUpdatedAt())
                .build();
    }

//    public void create(PieceCreateRequestDto dto) {
//        pieceRepository.save(dto.toEntity());
//    }

    public void create(PieceCreateRequestDto dto) {
        MultipartFile file = dto.getFile();
        String fileUrl = "";
        try {
            fileUrl = s3UploadService.saveFile(file);
        } catch (IOException e) {
            e.fillInStackTrace();
        }

        Piece piece = Piece.builder()
                .ownerId(dto.getOwnerId())
                .fileUrl(fileUrl)
                .name(dto.getName())
                .description(dto.getDescription())
                .type(dto.getType())
                .nftType(dto.getNftType())
                .status(dto.getStatus())
                .build();

        pieceRepository.save(piece);
    }

    public List<PieceSearchResponseDto> findAllPiece(Long userId, PieceType type, String condition, String keyWord, String sortBy){

        List<Piece> pieces = null;

        log.info("userId:{}, condition: {}, keyWord:{}, type:{}, sortBy:{}", userId, condition, keyWord, type, sortBy);

        if(sortBy.equals("updated_at")){
            try{
                PieceSearchOrderType pieceSearchOrderType = PieceSearchOrderType.valueOf(condition.toUpperCase());
                pieces = pieceSearchOrderType.getListByPieceSearchType(pieceRepository, userId, type, keyWord);
            } catch (Exception e){
            throw new NoPieceExistException();
            }
        } else{
            try{
                PieceSearchType pieceSearchType = PieceSearchType.valueOf(condition.toUpperCase());
                pieces = pieceSearchType.getListByPieceSearchType(pieceRepository, userId, type, keyWord);
            } catch (Exception e){
                throw new NoPieceExistException();
            }
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
