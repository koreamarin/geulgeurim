package com.geulgrim.recruit.job.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreateResumeResponse {
    private Long resumeId;
}
