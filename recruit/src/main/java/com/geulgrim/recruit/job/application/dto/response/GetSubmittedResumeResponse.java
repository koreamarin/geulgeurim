package com.geulgrim.recruit.job.application.dto.response;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class GetSubmittedResumeResponse {
    private Long resumeId;
    private String resultStatus;
    private String resumeUrl;
    private String resumeTitle;
}
