package com.geulgrim.recruit.job.application.dto.saramin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExperienceLevelResponse {
    private String code;
    private int min;
    private int max;
    private String name;
}
