package com.geulgrim.community.share.application.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShareResponse {
    private long shareId;
    private long userId;
    private String userNickname;
    private String userFileUrl;
    private String title;
    private String content;
    private long hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
