package com.geulgrim.recruit.job.application.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class GetAwardResponse {
    private Long awardId;
    private String awardName;
    private LocalDateTime acquisitionDate;
    private String institution;
    private String score;
}
