package com.geulgrim.recruit.job.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CreateExperienceRequest {
    private String experienceTitle;
    private String experienceContent;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}