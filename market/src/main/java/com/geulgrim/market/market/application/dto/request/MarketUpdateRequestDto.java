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
public class MarketUpdateRequestDto {

    private Long id;

    private Long piece;

    private String thumbnailUrl;

    private String title;

    private String content;

    private Double price;

    public Market toEntity(Long id) {
        return Market.builder()
                .price(price)
                .piece(piece)
                .seller(id)
                .thumbnailUrl("")
                .title(title)
                .content(content)
                .price(price)
                .build();
    }


}
