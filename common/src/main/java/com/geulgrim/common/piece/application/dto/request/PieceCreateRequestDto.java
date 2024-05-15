package com.geulgrim.common.piece.application.dto.request;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.entity.enums.NftType;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import com.geulgrim.common.piece.domain.entity.enums.Status;
import jakarta.persistence.Enumerated;

import static jakarta.persistence.EnumType.STRING;

public class PieceCreateRequestDto {

    private Long ownerId;

    private String fileUrl;

    private String name;

    private String description;

    @Enumerated(STRING)
    private PieceType type;

    @Enumerated(STRING)
    private NftType nftType;

    @Enumerated(STRING)
    private Status status;


    public Piece toEntity(){
        return Piece.builder()
                .ownerId(ownerId)
                .fileUrl(fileUrl)
                .name(name)
                .description(description)
                .type(type)
                .nftType(nftType)
                .status(status)
                .build();
    }
}
