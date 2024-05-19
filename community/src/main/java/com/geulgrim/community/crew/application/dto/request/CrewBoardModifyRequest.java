package com.geulgrim.community.crew.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.geulgrim.community.crew.domain.entity.enums.BoardStatus;
import lombok.Getter;

@Getter
public class CrewBoardModifyRequest {

    @JsonProperty("user_id")
    private Long userId;
    @JsonProperty("project_name")
    private String projectName;
    private String content;
    private Integer pen;
    private Integer color;
    private Integer bg;
    private Integer pd;
    private Integer story;
    private Integer conti;
    private BoardStatus status;
}
