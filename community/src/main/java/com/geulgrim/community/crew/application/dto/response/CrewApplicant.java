package com.geulgrim.community.crew.application.dto.response;


import com.geulgrim.community.crew.domain.entity.enums.Position;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CrewApplicant {

    private Long userId;
    private Long crewRequestId;
    private Position position;
    private String message;
}
