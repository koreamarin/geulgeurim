package com.geulgrim.auth.user.application.dto.response;

import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ResponseBody
public class UserLoginResponse {
    private Long user_id;
    private String nickname;
    private UserType userType;
    private String profile_url;

    @Override
    public String toString() {
        return """
                    {
                        "user_id":"%s",
                        "thumbnail_image_url":"%s",
                        "nickname":"%s",
                        "user_type":"%s"
                    }
                    """.formatted(user_id, profile_url, nickname, userType);
    }
}
