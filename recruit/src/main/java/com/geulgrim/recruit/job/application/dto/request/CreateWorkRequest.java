package com.geulgrim.recruit.job.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CreateWorkRequest {
    private String company;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String content;
}
