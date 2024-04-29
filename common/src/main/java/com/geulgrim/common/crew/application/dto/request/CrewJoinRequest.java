package com.geulgrim.common.crew.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.geulgrim.common.crew.domain.entity.enums.Position;
import lombok.Getter;

@Getter
public class CrewJoinRequest {

    @JsonProperty("user_id")
    private Long userId;
    private Position position;
    private String message;

}
