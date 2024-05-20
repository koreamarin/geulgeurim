package com.geulgrim.recruit.job.application.dto.request;

import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateJobRequest {
    private Long secondLocateKey;
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
    private List<Long> positionIds;
}