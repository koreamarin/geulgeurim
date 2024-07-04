package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Data
public class GetEducationResponse {
    private Long educationId;
    private String institutionName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String educationStatus;
    private BigDecimal gpa;
}
