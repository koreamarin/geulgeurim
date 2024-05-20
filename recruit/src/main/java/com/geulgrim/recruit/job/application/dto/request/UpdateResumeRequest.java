package com.geulgrim.recruit.job.application.dto.request;

import lombok.Data;

@Data
public class UpdateResumeRequest {
    private Long resumeId;
    private String resumeTitle;
    private String essay;
    private String openStatus;
}
