package com.geulgrim.recruit.job.application.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetResumePortfolioResponse {
    private Long resumePofolId;
    private Long pofolId;
}
