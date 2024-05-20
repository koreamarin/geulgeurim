package com.geulgrim.auth.user.application.dto.request;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class OAuthUserInfoRequest {
    private Long id;
//    private LocalDateTime connected_at;
//    private LocalDateTime synched_at;
    private String connected_at;
    private String synched_at;
    @JsonProperty("properties")
    private PropertiesRequest properties;
    @JsonProperty("kakao_account")
    private KakaoAccountRequest kakao_account;

    @Override
    public String toString() {
        return "OAuthUserInfoRequest{" +
                "id=" + id +
                ", connected_at=" + connected_at +
                ", synched_at=" + synched_at +
                ", properties=" + properties.toString() +
                ", kakao_account=" + kakao_account.toString() +
                '}';
    }

}
