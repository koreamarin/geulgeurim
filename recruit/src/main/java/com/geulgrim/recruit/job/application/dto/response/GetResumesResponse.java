package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.ResumePosition;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetResumesResponse {
    private Long resumeId;
    private String resumeTitle;
    private String essay;
    private String openStatus;
    private String fileUrl;
    private List<GetResumePositionResponse> getResumePositionResponses;
    private String createdAt;
    private String updatedAt;
}