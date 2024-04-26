package com.geulgrim.common.portfolio.application.dto.response;

import com.geulgrim.common.portfolio.domain.entity.enums.OpenState;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PortfolioResponse {

    private Long pofolId;
    private String pofolName;
    private OpenState status;

}
