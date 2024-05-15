package com.geulgrim.common.portfolio.application.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PieceInfo {

    private Long pieceId;
    private String identifier; // MultipartFile 이름과 비교
    private String title;
    private String program;
    private String contribution;
    private String content;

}
