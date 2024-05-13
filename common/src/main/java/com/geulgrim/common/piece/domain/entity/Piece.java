package com.geulgrim.common.piece.domain.entity;

import com.geulgrim.common.global.domain.entity.BaseEntity;
import com.geulgrim.common.piece.domain.entity.enums.NftType;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import com.geulgrim.common.piece.domain.entity.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class Piece extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private Long ownerId;

    private String fileUrl;

    // 작품 이름
    private String name;

    // 작품 설명
    private String description;

    // 작품 종류
    @Enumerated(STRING)
    private PieceType type;

    // 작품 NFT 여부
    @Enumerated(STRING)
    private NftType nftType;

    //작품 공개여부
    @Enumerated(STRING)
    private Status status;

}
