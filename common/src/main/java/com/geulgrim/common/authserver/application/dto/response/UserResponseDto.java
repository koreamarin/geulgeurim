package com.geulgrim.common.authserver.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {

    private Long userId;
    private String email;
    private String birthday;
    private String name;
    private String nickname;
    private String wallet;
    private String userType;
    private String fileUrl;
    private String phoneNum;
    private String fcmToken;
}
