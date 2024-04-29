package com.geulgrim.common.crew.application.dto.request;

import com.geulgrim.common.crew.domain.entity.enums.CrewStatus;


public record CrewReply(
        CrewStatus status
) {
}
