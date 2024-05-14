package com.geulgrim.community.crew.application.dto.response;


import com.geulgrim.community.crew.domain.entity.CrewImage;
import com.geulgrim.community.crew.domain.entity.enums.BoardStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CrewListResponse {
    private long boardId;
    private long userId;
    private String userNickname;
    private String userFileUrl;
    private String projectName;
    private List<CrewImage> imageList;
    private int pen;
    private int color;
    private int bg;
    private int pd;
    private int story;
    private int conti;
    private BoardStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}