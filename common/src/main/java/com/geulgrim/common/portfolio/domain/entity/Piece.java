package com.geulgrim.common.portfolio.domain.entity;

import com.geulgrim.common.portfolio.domain.entity.enums.NftType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class Piece {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private String pieceId;

    private String pname;
    private String pcontent;
    private String ptype;
    private NftType nftType;
}
