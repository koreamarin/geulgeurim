package com.geulgrim.common.recruitserver.application.dto.response;

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
public class SimpleJobResponseDto {

    private Long jobId;
    private String title;
    private String companyName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
