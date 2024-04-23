package com.geulgrim.common.portfolio.dto;

import com.geulgrim.common.portfolio.entity.enums.OpenState;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PortfolioResponse {

    private Long pofolId;
    private String pofolName;
    private OpenState status;

}
