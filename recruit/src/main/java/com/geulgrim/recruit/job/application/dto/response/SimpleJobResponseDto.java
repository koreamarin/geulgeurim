package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.Job;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@ToString
@Getter
public class SimpleJobResponseDto {
    private Long jobId;
    private String title;
    private String companyName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static SimpleJobResponseDto from(Job job){
        return SimpleJobResponseDto.builder()
                .jobId(job.getJobId())
                .title(job.getTitle())
                .companyName(job.getCompanyName())
                .startDate(job.getStartDate())
                .endDate(job.getEndDate())
                .build();
    }
}
