package com.geulgrim.common.portfolio.application.dto.response;


import com.geulgrim.common.portfolio.domain.entity.enums.OpenState;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;

@Getter
@Builder
public class PortfolioResponseDetail {

    private Long pofolId;
    private String pofolName; // 포폴 제목
    private OpenState status; // 공개, 비공개 여부
    private ArrayList<PieceInfoDetail> pieces;

}
