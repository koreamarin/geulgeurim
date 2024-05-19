package com.geulgrim.community.crew.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewImageResponse {
    private Long crewImageId;
    private String fileUrl;
}
