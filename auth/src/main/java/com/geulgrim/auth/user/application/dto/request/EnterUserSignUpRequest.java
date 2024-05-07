package com.geulgrim.auth.user.application.dto.request;

import lombok.*;

@Getter
@ToString
public class EnterUserSignUpRequest {
    private String email;               // User
    private String password;            // EnterUser
    private String representative;      // User
    private String manager;             // EnterUser
    private String opening;             // User
    private String company_num;         // EnterUser
    private String business_name;       // User
    private String address;             // EnterUser
    private String phone_num;           // User
}
