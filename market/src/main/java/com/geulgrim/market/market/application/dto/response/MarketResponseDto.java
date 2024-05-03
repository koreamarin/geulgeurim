package com.geulgrim.market.market.application.dto.response;

import com.geulgrim.market.market.domain.Market;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarketResponseDto {

    private Long id;

    private Long piece;

    private Long seller; //auth 서버 유저id 필요

    private String thumbnailUrl;

    private String title;

    private String content;

    private Double price;

    private int viewCount;

    public static MarketResponseDto from(Market market) {
        return MarketResponseDto.builder()
                .id(market.getId())
                .piece(market.getPiece())
                .seller(market.getSeller())
                .thumbnailUrl(market.getThumbnailUrl())
                .title(market.getTitle())
                .content(market.getContent())
                .price(market.getPrice())
                .viewCount(market.getViewCount())
                .build();
    }
}
