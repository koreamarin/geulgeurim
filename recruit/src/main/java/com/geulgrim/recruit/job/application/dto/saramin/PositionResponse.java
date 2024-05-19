package com.geulgrim.recruit.job.application.dto.saramin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PositionResponse {
    private String title;
    private IndustryResponse industry;
    private LocationResponse location;
    @JsonProperty("job-type")
    private JobTypeResponse jobType;
    @JsonProperty("job-mid-code")
    private JobMidCodeResponse jobMidCode;
    @JsonProperty("experience-level")
    private ExperienceLevelResponse experienceLevel;
    @JsonProperty("required-education-level")
    private RequiredEducationLevelResponse requiredEducationLevel;


}
