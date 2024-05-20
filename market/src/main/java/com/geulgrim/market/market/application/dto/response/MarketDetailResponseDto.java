package com.geulgrim.market.market.application.dto.response;

import com.geulgrim.market.commonserver.piece.application.response.PieceResponseDto;
import com.geulgrim.market.commonserver.piece.domain.PieceType;
import com.geulgrim.market.market.domain.Market;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static jakarta.persistence.EnumType.STRING;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarketDetailResponseDto {

    private static final Logger log = LoggerFactory.getLogger(MarketDetailResponseDto.class);
    private Long id; //게시글 아이디

    private String pieceFileUrl; //작품 이미지

    // 작품 이름
    private String pieceName;

    // 작품 설명
    private String pieceDescription;

    // 작품 종류
    @Enumerated(STRING)
    private PieceType pieceType;

    private Long seller; //auth 서버 유저id 필요

    private String title;

    private String content;

    private Double price;

    private int viewCount;

    public static MarketDetailResponseDto from(Market market, PieceResponseDto dto) {
        log.info("pieceType ={}", dto.getType());
        return MarketDetailResponseDto.builder()
                .id(market.getId())
                .pieceFileUrl(dto.getFileUrl())
                .pieceName(dto.getName())
                .pieceDescription(dto.getDescription())
                .pieceType(dto.getType())
                .seller(market.getSeller())
                .title(market.getTitle())
                .content(market.getContent())
                .price(market.getPrice())
                .viewCount(market.getViewCount())
                .build();
    }
}
