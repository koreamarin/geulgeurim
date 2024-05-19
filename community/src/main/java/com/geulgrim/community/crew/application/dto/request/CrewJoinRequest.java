package com.geulgrim.community.crew.application.dto.request;

import com.geulgrim.community.crew.domain.entity.enums.Position;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CrewJoinRequest {
    private Position position;
    private String message;
}
