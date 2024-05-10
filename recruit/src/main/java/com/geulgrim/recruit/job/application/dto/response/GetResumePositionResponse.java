package com.geulgrim.recruit.job.application.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class GetResumePositionResponse {
    private Long resumePositionId;
    private Long positionId;
}
