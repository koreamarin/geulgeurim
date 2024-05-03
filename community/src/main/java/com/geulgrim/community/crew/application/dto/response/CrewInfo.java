package com.geulgrim.community.crew.application.dto.response;

import com.geulgrim.community.crew.domain.entity.enums.Position;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewInfo {

    private Long userId;
    private String nickname;
    private Position position;

}
