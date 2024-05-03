package com.geulgrim.auth.user.application.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class GeneratedJWT {
    private String accessToken;
    private String refreshToken;
}
