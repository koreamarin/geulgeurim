package com.geulgrim.community.global.user.domain.entity;


import com.geulgrim.community.global.user.domain.entity.enums.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userId;
    private String email;
    private String birthday;
    private String nickname;
    private String wallet;
    @Enumerated(STRING)
    private UserType userType;
    private String phoneNum;
    private String fileUrl;
}
