package com.geulgrim.market.commonserver.piece.application;

import com.geulgrim.market.commonserver.piece.application.response.PieceResponseDto;
import com.geulgrim.market.commonserver.piece.presentation.PieceFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PieceService {

    private final PieceFeignClient pieceFeignClient;

    public PieceResponseDto findPieceFromCommon(Long id) {
        return pieceFeignClient.findById(id);
    }
}
