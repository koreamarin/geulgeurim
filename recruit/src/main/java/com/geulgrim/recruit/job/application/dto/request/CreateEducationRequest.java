package com.geulgrim.recruit.job.application.dto.request;

import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CreateEducationRequest {
    private String insitutionName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String educationStatus;
    private BigDecimal gpa;
}
