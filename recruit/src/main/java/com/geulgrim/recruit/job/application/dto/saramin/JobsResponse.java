package com.geulgrim.recruit.job.application.dto.saramin;


import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobsResponse {
    private int count;
    private int start;
    private int total;
    private List<JobResponse> job;
}
