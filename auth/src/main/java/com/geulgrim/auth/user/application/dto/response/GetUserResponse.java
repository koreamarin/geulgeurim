package com.geulgrim.auth.user.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ResponseBody
public class GetUserResponse {
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
