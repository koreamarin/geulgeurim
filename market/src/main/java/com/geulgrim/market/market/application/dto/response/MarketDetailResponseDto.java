package com.geulgrim.market.market.application.dto.response;

import com.geulgrim.market.commonserver.piece.application.response.PieceResponseDto;
import com.geulgrim.market.commonserver.piece.domain.PieceType;
import com.geulgrim.market.market.domain.Market;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarketDetailResponseDto {

    private Long id; //게시글 아이디

    private String fileUrl; //작품 이미지

    // 작품 이름
    private String name;

    // 작품 설명
    private String description;

    // 작품 종류
    @Enumerated(STRING)
    private PieceType type;

    private Long seller; //auth 서버 유저id 필요

    private String title;

    private String content;

    private Double price;

    private int viewCount;

    public static MarketDetailResponseDto from(Market market, PieceResponseDto dto) {
        return MarketDetailResponseDto.builder()
                .id(market.getId())
                .fileUrl(dto.getFileUrl())
                .name(dto.getName())
                .description(dto.getDescription())
                .type(dto.getPieceType())
                .seller(market.getSeller())
                .title(market.getTitle())
                .content(market.getContent())
                .price(market.getPrice())
                .viewCount(market.getViewCount())
                .build();
    }
}
