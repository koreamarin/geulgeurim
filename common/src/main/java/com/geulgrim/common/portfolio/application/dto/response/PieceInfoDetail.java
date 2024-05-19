package com.geulgrim.common.portfolio.application.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PieceInfoDetail {

    private String title;
    private String program;
    private String contribution;
    private String content;
    private String pieceUrl; // 작품 url
}
