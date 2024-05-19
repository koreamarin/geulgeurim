package com.geulgrim.common.piece.application.dto.response;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.entity.enums.NftType;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import com.geulgrim.common.piece.domain.entity.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PieceSearchResponseDto {

    private Long id;

    private Long ownerId;

    private String fileUrl;

    // 작품 이름
    private String name;

    // 작품 설명
    private String description;

    // 작품 종류
    private PieceType type;

    // 작품 NFT 여부
    private NftType nftType;

    //작품 공개여부
    private Status status;

    public static PieceSearchResponseDto from(Piece piece) {
        return PieceSearchResponseDto.builder()
                .id(piece.getId())
                .ownerId(piece.getOwnerId())
                .fileUrl(piece.getFileUrl())
                .name(piece.getName())
                .description(piece.getDescription())
                .type(piece.getType())
                .nftType(piece.getNftType())
                .status(piece.getStatus())
                .build();
    }
}
