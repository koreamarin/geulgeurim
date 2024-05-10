package com.geulgrim.recruit.job.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;


@Getter
@Setter
@ToString
public class CreateAwardRequest {
    private String awardName;
    private LocalDateTime acquisitionDate;
    private String institution;
    private String score;
}