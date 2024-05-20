package com.geulgrim.auth.user.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PropertiesRequest {
    @JsonProperty("nickname")
    private String nickname;
    @JsonProperty("profile_image")
    private String profile_image;
    @JsonProperty("thumbnail_image")
    private String thumbnail_image;

    @Override
    public String toString() {
        return "PropertiesRequest{" +
                "nickname='" + nickname + '\'' +
                ", profile_image='" + profile_image + '\'' +
                ", thumbnail_image='" + thumbnail_image + '\'' +
                '}';
    }
}
