package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetMyApplyedJobsResponse {
    private String resumeUrl;
    private String resultStatus;
    private String jobTitle;
    private List<String> position;
    private String companyName;
    private String endDate;
    private Long jobId;
}
