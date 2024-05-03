package com.geulgrim.market.market.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ETHResponseDto {

    private String openingPrice;

    private String minPrice;
}
