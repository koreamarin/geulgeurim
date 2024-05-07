package com.geulgrim.common.piece.presentation;

import com.geulgrim.common.piece.application.PieceService;
import com.geulgrim.common.piece.application.dto.response.PieceResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
