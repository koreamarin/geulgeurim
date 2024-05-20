package com.geulgrim.recruit.job.application.dto.saramin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobResponse {
    private String url;
    private int active;
    private CompanyResponse company;
    private PositionResponse position;
    private String keyword;
    private SalaryResponse salary;
    private Long id;
    @JsonProperty("posting-timestamp")
    private String postingTimestamp;
    @JsonProperty("modification-timestamp")
    private String modificationTimestamp;
    @JsonProperty("opening-timestamp")
    private String openingTimestamp;
    @JsonProperty("expiration-timestamp")
    private String expirationTimestamp;
    @JsonProperty("close-type")
    private CloseTypeResponse closeType;
}