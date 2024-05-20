package com.geulgrim.community.board.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardListResponse {
    private long boardId;
    private long userId;
    private String userNickname;
    private String title;
    private long hit;
    private long commentCnt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
