package com.geulgrim.community.board.application.dto.response;

import com.geulgrim.community.board.domain.entity.BoardComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponse {
    private long boardId;
    private long userId;
    private String title;
    private String content;
    private long hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<BoardComment> commentList;
}
