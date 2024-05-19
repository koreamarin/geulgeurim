package com.geulgrim.community.crew.application.dto.response;


import com.geulgrim.community.crew.domain.entity.enums.BoardStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Builder
@Setter @Getter
public class CrewBoardDetail {

    private Long crewId;
    private String projectName;
    private String content;
    private Integer pen;
    private Integer color;
    private Integer bg;
    private Integer pd;
    private Integer story;
    private Integer conti;
    private BoardStatus status;
    private ArrayList<String> images;
    private ArrayList<CrewInfo> crewInfo;
    private LocalDateTime createdAt;
    private Boolean owner;

}
