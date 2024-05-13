package com.geulgrim.auth.user.application.dto.response;

import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLoginResponse {
    private Long user_id;
    private String nickname;
    private UserType userType;
    private String profile_url;
}
