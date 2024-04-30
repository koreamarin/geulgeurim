package com.geulgrim.auth.user.application.dto.request;

import com.fasterxml.jackson.annotation.JsonAnyGetter;

import java.time.LocalDateTime;

public class OAuthUserInfoRequest {
    private Long id;
    private LocalDateTime connected_at;
    private LocalDateTime synched_at;
    @JsonAnyGetter
    private PropertiesRequest properties;
    @JsonAnyGetter
    private KakaoAccountRequest kakao_account;

}
