package com.geulgrim.community.crew.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class MyCrewListResponse {
    private Long crewId;
    private String projectName;
    private Long applyCnt;
}
