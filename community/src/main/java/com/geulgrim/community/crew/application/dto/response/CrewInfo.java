package com.geulgrim.community.crew.application.dto.response;

import com.geulgrim.community.crew.domain.entity.enums.CrewStatus;
import com.geulgrim.community.crew.domain.entity.enums.Position;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewInfo {
    private Long crewRequestId;
    private Long userId;
    private String nickname;
    private Position position;
    private String message;
    private CrewStatus status;

}
