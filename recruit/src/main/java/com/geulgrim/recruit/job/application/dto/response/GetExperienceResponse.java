package com.geulgrim.recruit.job.application.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class GetExperienceResponse {
    private Long experienceId;
    private String experienceTitle;
    private String experienceContent;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
