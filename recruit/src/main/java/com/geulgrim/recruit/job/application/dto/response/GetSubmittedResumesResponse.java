package com.geulgrim.recruit.job.application.dto.response;

import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class GetSubmittedResumesResponse {
    private List<GetSubmittedResumeResponse> getSubmittedResumesResponse;
}
