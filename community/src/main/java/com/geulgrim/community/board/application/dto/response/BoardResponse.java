package com.geulgrim.community.board.application.dto.response;

import com.geulgrim.community.board.domain.entity.Board;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponse {
    private long boardId;
    private long userId;
    private String userNickname;
    private String userFileUrl;
    private String title;
    private String content;
    private long hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
