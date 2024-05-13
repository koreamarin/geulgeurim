package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetJobsResponse {
    private Long jobId;
    private SecondLocate secondLocate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String title;
    private String companyName;
    private List<Long> positionIds;
}
