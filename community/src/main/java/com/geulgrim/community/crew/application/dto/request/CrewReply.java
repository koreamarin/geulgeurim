package com.geulgrim.community.crew.application.dto.request;

import com.geulgrim.community.crew.domain.entity.enums.CrewStatus;

public record CrewReply(
        CrewStatus status
) {
}
