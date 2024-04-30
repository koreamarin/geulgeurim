package com.geulgrim.common.push.application.dto.response;

import com.geulgrim.common.push.domain.Push;
import com.geulgrim.common.push.domain.PushDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushResponseDto {

    private Long id;

    private Long senderId;

    private PushDomain domain;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    public static PushResponseDto from(Push push) {

        return PushResponseDto.builder()
                .id(push.getId())
                .senderId(push.getSenderId())
                .domain(push.getDomain())
                .title(push.getTitle())
                .content(push.getContent())
                .createdAt(push.getCreatedAt())
                .build();
    }
}