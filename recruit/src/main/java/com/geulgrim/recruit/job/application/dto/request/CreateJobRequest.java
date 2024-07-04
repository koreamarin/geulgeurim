package com.geulgrim.recruit.job.application.dto.request;

import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
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

    @Builder
    private CreateJobRequest (Long secondLocateKey, LocalDateTime startDate, LocalDateTime endDate, String url, String title, String content, String companyName, String companyUrl, String jobType, String experienceType, int minExperience, String education, String perk, String procedureInfo, String salary, String closeType, String openStatus, List<Long> positionIds) {
        this.secondLocateKey = secondLocateKey;
        this.startDate = startDate;
        this.endDate = endDate;
        this.url = url;
        this.title = title;
        this.content = content;
        this.companyName = companyName;
        this.companyUrl = companyUrl;
        this.jobType = jobType;
        this.experienceType = experienceType;
        this.minExperience = minExperience;
        this.education = education;
        this.perk = perk;
        this.procedureInfo = procedureInfo;
        this.salary = salary;
        this.closeType = closeType;
        this.openStatus = openStatus;
        this.positionIds = positionIds;
    }
}