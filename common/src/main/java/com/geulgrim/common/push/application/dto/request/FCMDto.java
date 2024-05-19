package com.geulgrim.common.push.application.dto.request;

import com.geulgrim.common.authserver.application.dto.response.UserResponseDto;
import com.geulgrim.common.push.domain.Push;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FCMDto {

    private String fcmToken;

    private String title;

    private String content;

    public static FCMDto of(UserResponseDto userDto, Push push) {

        return FCMDto.builder()
                .fcmToken(userDto.getFcmToken())
                .title(push.getTitle())
                .content(push.getContent())
                .build();
    }
}
