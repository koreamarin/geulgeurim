package com.geulgrim.auth.user.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("is_email_valid")
    private boolean is_email_valid;
    @JsonProperty("is_email_verified")
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

    @Override
    public String toString() {
        return "KakaoAccountRequest{" +
                "profile_nickname_needs_agreement=" + profile_nickname_needs_agreement +
                ", profile_image_needs_agreement=" + profile_image_needs_agreement +
                ", profile=" + profile.toString() +
                ", name_needs_agreement=" + name_needs_agreement +
                ", name='" + name + '\'' +
                ", has_email=" + has_email +
                ", email_needs_agreement=" + email_needs_agreement +
                ", is_email_valid=" + is_email_valid +
                ", is_email_verified=" + is_email_verified +
                ", email='" + email + '\'' +
                ", has_phone_number=" + has_phone_number +
                ", phone_number_needs_agreement=" + phone_number_needs_agreement +
                ", phone_number='" + phone_number + '\'' +
                ", has_birthyear=" + has_birthyear +
                ", birthyear_needs_agreement=" + birthyear_needs_agreement +
                ", birthyear='" + birthyear + '\'' +
                ", has_birthday=" + has_birthday +
                ", birthday_needs_agreement=" + birthday_needs_agreement +
                ", birthday='" + birthday + '\'' +
                ", birthday_type='" + birthday_type + '\'' +
                '}';
    }
}
