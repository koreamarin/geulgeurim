package com.geulgrim.common.crew.application.dto.response;

import com.geulgrim.common.crew.domain.entity.enums.BoardStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class CrewBoard {

    private Long crewId;
    private String projectName;
    private Integer pen;
    private Integer color;
    private Integer bg;
    private Integer pd;
    private Integer story;
    private Integer conti;
    private String thumbnail;
    private LocalDate date;
    private BoardStatus status;
}
