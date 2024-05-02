package com.geulgrim.common.piece.domain.entity;

import com.geulgrim.common.piece.domain.entity.enums.NftType;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
@Setter
public class Piece {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column
    private Long pieceId;

    private Long ownerId;

    private String imageUrl;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private PieceType type;

    @Enumerated(EnumType.STRING)
    private NftType nftType;

}
