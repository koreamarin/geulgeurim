package com.geulgrim.common.email.domain;

import com.geulgrim.common.email.application.pushMailCreateDto;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMail {

    private String senderId;

    private String receiverId;

    private String title;

    private String content;

    private boolean isChecked;

    public PushMail toEntity(pushMailCreateDto dto) {
        return PushMail.builder()
                .senderId(dto.getSenderId())
                .receiverId(dto.getReceiverId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .isChecked(false)
                .build();
    }
}
