package com.geulgrim.common.piece.presentation;

import com.geulgrim.common.piece.application.PieceService;
import com.geulgrim.common.piece.application.dto.request.PieceCreateRequestDto;
import com.geulgrim.common.piece.application.dto.response.PieceResponseDto;
import com.geulgrim.common.piece.application.dto.response.PieceSearchResponseDto;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/common/piece")
@CrossOrigin(origins = {"http://localhost:3000", "https://글그림.com", "https://xn--2i0bpa721g.com/"})
@RequiredArgsConstructor
public class PieceController {

    private final PieceService pieceService;

    @GetMapping("/detail/{id}")
    @Operation(summary = "작품조회", description = "id로 piece를 조회합니다. market server가 사용하는 api입니다.")
    public ResponseEntity<PieceResponseDto> findById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(pieceService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    @Operation(summary = "작품등록", description = "작품 정보를 입력받아 작품을 등록하는 api입니다.")
    public ResponseEntity<?> create(
            @RequestPart PieceCreateRequestDto dto,
            @RequestPart MultipartFile file,
            @RequestHeader HttpHeaders headers
            ){
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        dto.setFile(file);
        dto.setOwnerId(userId);
        pieceService.create(dto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/search")
    @Operation(summary = "작품검색", description = "userId, 검색조건, 검색어, 정렬조건을 입력받아 조건에 해당하는 작품들을 반환하는 api입니다.")
    public ResponseEntity<List<PieceSearchResponseDto>> findAllPiece(
            @RequestHeader HttpHeaders headers,
            @RequestParam(name = "condition", defaultValue = "name") String condition,
            @RequestParam(name = "key_word", defaultValue = "") String keyWord,
            @RequestParam(name = "type", defaultValue = "NONE") String type,
            @RequestParam(name = "sort", defaultValue = "updated_at") String sortBy
            ){
        Long userId = Long.parseLong(Objects.requireNonNull(headers.get("user_id")).get(0));
        return new ResponseEntity<>(pieceService.findAllPiece(userId, PieceType.valueOf(type.toUpperCase()), condition, keyWord, sortBy), HttpStatus.OK);
    }

    @DeleteMapping("/del/{piece_id}")
    @Operation(summary = "작품 삭제", description = "작품 id를 입력받아 해당 작품을 삭제하는 api입니다.")
    public ResponseEntity<?> deletePiece(@PathVariable("piece_id") Long piece_id){
        pieceService.deletePiece(piece_id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
