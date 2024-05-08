package com.geulgrim.market.commonserver.piece.application.response;

import com.geulgrim.market.commonserver.piece.domain.PieceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PieceResponseDto {

    private Long pieceId;

    private Long ownerId;

    private String fileUrl;

    private String name;

    private String description;

    private PieceType type;

}
