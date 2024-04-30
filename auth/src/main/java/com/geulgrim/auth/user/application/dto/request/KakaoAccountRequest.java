package com.geulgrim.auth.user.application.dto.request;

import lombok.Getter;

@Getter
public class KakaoAccountRequest {
    private boolean profile_nickname_needs_agreement;
    private boolean profile_image_needs_agreement;
    private ProfileRequest profile;
    private boolean name_needs_agreement;
    private String name;
    private boolean has_email;
    private boolean email_needs_agreement;
    private boolean is_email_valid;
    private boolean is_email_verified;
    private String email;
    private boolean has_phone_number;
    private boolean phone_number_needs_agreement;
    private String phone_number;
    private boolean has_birthyear;
    private boolean birthyear_needs_agreement;
    private String birthyear;
    private boolean has_birthday;
    private boolean birthday_needs_agreement;
    private String birthday;
    private String birthday_type;


}
