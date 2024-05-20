package com.geulgrim.community.board.application.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardCommentResponse {
    private long boardCommentId;
    private long userId;
    private String userNickname;
    private String userFileUrl;
    private String content;
    private long boardId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
