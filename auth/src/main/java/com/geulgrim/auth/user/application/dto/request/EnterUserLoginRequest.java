package com.geulgrim.auth.user.application.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EnterUserLoginRequest {
    private String email;               // User
    private String password;            // EnterUser
}
