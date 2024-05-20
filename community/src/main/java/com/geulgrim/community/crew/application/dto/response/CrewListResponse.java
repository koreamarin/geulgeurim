package com.geulgrim.community.crew.application.dto.response;


import com.geulgrim.community.crew.domain.entity.CrewImage;
import com.geulgrim.community.crew.domain.entity.enums.BoardStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewListResponse {
    private long crewId;
    private long userId;
    private String userNickname;
    private String userFileUrl;
    private String projectName;
    private List<CrewImageResponse > imageList;
    private int pen;
    private int color;
    private int bg;
    private int pd;
    private int story;
    private int conti;
    private BoardStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public CrewListResponse (long crewId, long userId, String userNickname, String userFileUrl, String projectName,
                             int pen, int color, int bg, int pd, int story, int conti, BoardStatus status,
                             LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.crewId = crewId;
        this.userId = userId;
        this.userNickname = userNickname;
        this.userFileUrl = userFileUrl;
        this.projectName = projectName;
        this.pen = pen;
        this.color = color;
        this.bg = bg;
        this.pd = pd;
        this.story = story;
        this.conti = conti;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public CrewListResponse(Long crewId, Long userId, String userNickname, String userFileUrl, String projectName,
                            int pen, int color, int bg, int pd, int story, int conti, BoardStatus status,
                            LocalDateTime createdAt, LocalDateTime updatedAt, List<CrewImageResponse > imageList) {
        this.crewId = crewId;
        this.userId = userId;
        this.userNickname = userNickname;
        this.userFileUrl = userFileUrl;
        this.projectName = projectName;
        this.pen = pen;
        this.color = color;
        this.bg = bg;
        this.pd = pd;
        this.story = story;
        this.conti = conti;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.imageList = imageList; // 이 부분을 추가
    }
}

