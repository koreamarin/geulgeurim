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
public class BoardResponse {
    private long boardId;
    private long userId;
    private String title;
    private long hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private long commentCnt;
}
