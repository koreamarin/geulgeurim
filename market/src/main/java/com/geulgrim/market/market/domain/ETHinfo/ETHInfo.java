package com.geulgrim.market.market.domain.ETHinfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ETHInfo {
    private String status;

    private Data data;

}
