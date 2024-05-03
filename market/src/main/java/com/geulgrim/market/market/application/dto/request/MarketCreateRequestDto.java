package com.geulgrim.market.market.application.dto.request;

import com.geulgrim.market.market.domain.Market;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarketCreateRequestDto {

    private Long piece;

    private Long seller; //auth 서버 유저id 필요

    private String title;

    private String content;

    private Double price;

    public Market toEntity() {
        return Market.builder()
                .price(price)
                .piece(piece)
                .seller(seller)
                .thumbnailUrl("")
                .title(title)
                .content(content)
                .price(price)
                .viewCount(0)
                .build();
    }

}
