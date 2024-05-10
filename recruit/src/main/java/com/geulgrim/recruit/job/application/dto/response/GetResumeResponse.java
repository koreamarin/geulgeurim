package com.geulgrim.recruit.job.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetResumeResponse {
    private Long resumeId;
    private String resumeTitle;
    private String essay;
    private String openStatus;
    private String fileUrl;
    private List<GetResumePositionResponse> resumePositionResponses;
    private List<GetResumePortfolioResponse> resumePortfolioResponses;
    private List<GetEducationResponse> educationResponses;
    private List<GetWorkResponse> workResponses;
    private List<GetAwardResponse> awardResponses;
    private List<GetExperienceResponse> experienceResponses;
}
