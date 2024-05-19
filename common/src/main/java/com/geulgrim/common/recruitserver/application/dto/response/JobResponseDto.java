package com.geulgrim.common.recruitserver.application.dto.response;

import com.geulgrim.common.recruitserver.doamin.SecondLocate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobResponseDto {

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

}
