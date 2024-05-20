package com.geulgrim.community.crew.application.dto.response;

import com.geulgrim.community.crew.domain.entity.enums.CrewStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class MyApplyListResponse {
    private Long applyId;
    private String message;
    private CrewStatus status;
    private Long crewId;
}
