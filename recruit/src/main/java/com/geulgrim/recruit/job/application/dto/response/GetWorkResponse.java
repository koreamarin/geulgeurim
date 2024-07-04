package com.geulgrim.recruit.job.application.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Data
public class GetWorkResponse {
    private Long workId;
    private String companyName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String content;
}
