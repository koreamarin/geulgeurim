package com.geulgrim.common.piece.presentation;

import com.geulgrim.common.piece.application.PieceService;
import com.geulgrim.common.piece.application.dto.response.PieceResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/common/piece")
@RequiredArgsConstructor
public class PieceController {

    private final PieceService pieceService;

    @GetMapping("/{id}")
    @Operation(summary = "작품조회", description = "id로 piece를 조회합니다. market server가 사용하는 api입니다.")
    public ResponseEntity<PieceResponseDto> findById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(pieceService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    @Operation(summary = "작품등록", description = "작품 정보를 입력받아 작품을 등록하는 api입니다.")
    public ResponseEntity<PieceCreateRequestDto> create(@RequestBody PieceCreateRequestDto dto){
        return new ResponseEntity<>(pieceService.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/search")
    @Operation(summary = "작품검색", description = "userId, 검색조건, 검색어, 정렬조건을 입력받아 조건에 해당하는 작품들을 반환하는 api입니다.")
    public ResponseEntity<List<PieceResponseDto>> findAll(
            @RequestParam(name = "user_id", required = true) Long userId,
            @RequestParam(name = "condition", defaultValue = "title") String condition,
            @RequestParam(name = "key_word", defaultValue = "") String key_word,
            @RequestParam(name = "sort", defaultValue = "created_at") String sort
            ){
        return new ResponseEntity<>(pieceService.findAllPiece(), HttpStatus.OK);
    }

}
