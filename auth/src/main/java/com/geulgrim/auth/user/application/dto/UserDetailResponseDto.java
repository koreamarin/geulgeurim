package com.geulgrim.auth.user.application.dto;

import com.geulgrim.auth.user.domain.User;
import com.geulgrim.auth.user.domain.UserType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import static jakarta.persistence.EnumType.STRING;

@Builder
@Getter
@AllArgsConstructor
public class UserDetailResponseDto {

    private Long userId;
    private String password;
    private String email;
    private String birthday;
    private String name;
    private String wallet;
    private UserType userType;
    private String phoneNum;

    public static UserDetailResponseDto from(User user){
        return UserDetailResponseDto.builder()
                .userId(user.getUserId())
                .password(user.getPassword())
                .email(user.getEmail())
                .birthday(user.getBirthday())
                .name(user.getName())
                .wallet(user.getWallet())
                .userType(user.getUserType())
                .phoneNum(user.getPhoneNum())
                .build();
    }
}
