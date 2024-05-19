package com.geulgrim.recruit.job.application.dto.saramin;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaraminApiResponse {
    @JsonProperty("jobs")
    private JobsResponse jobs;
}
