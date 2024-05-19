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
public class GetJobResponse {
    private Long jobId;
    private SecondLocate secondLocate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String url;
    private String title;
    private String content;
    private String companyName;
    private String companyUrl;
    private String jobType;
    private String experienceType;
    private int minExperience;
    private String education;
    private String perk;
    private String procedureInfo;
    private String salary;
    private String closeType;
    private String openStatus;
    private String fileUrl;
    private Boolean star;
    private List<Long> positionIds;
    private Boolean applyStatus;
}
