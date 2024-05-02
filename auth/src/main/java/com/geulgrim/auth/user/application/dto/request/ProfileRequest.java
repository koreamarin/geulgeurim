package com.geulgrim.auth.user.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ProfileRequest {

    private String nickname;
    private String thumbnail_image_url;
    private String profile_image_url;
    @JsonProperty("is_default_image")
    private boolean is_default_image;
    @JsonProperty("is_default_nickname")
    private boolean is_default_nickname;

    @Override
    public String toString() {
        return "ProfileRequest{" +
                "nickname='" + nickname + '\'' +
                ", thumbnail_image_url='" + thumbnail_image_url + '\'' +
                ", profile_image_url='" + profile_image_url + '\'' +
                ", is_default_image=" + is_default_image +
                ", is_default_nickname=" + is_default_nickname +
                '}';
    }
}
