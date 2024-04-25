package com.geulgrim.common.pushmail.domain;

import com.geulgrim.common.pushmail.application.PushMailCreateDto;
import com.geulgrim.common.global.entity.BaseEntity;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMail extends BaseEntity {

    private String senderId;

    private String receiverId;

    private String title;

    private String content;

    private boolean isChecked;

    public PushMail toEntity(PushMailCreateDto dto) {
        return PushMail.builder()
                .senderId(dto.getSenderId())
                .receiverId(dto.getReceiverId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .isChecked(false)
                .build();
    }
}
