package com.geulgrim.community.share.application.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShareCommentResponse {
    private long shareCommentId;
    private long userId;
    private String userNickname;
    private String userFileUrl;
    private String content;
    private long shareId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
