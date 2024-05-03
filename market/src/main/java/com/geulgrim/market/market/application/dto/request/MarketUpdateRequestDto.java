package com.geulgrim.market.market.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarketUpdateRequestDto {

    private Long piece;

    private String title;

    private String content;

    private Double price;

}
