package com.geulgrim.common.user.domain.entity;


import com.geulgrim.common.user.domain.entity.enums.UserType;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

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
    private String name;
    private String nickname;
    private String wallet;
    @Enumerated(STRING)
    private UserType userType;
    private String phoneNum;
    private String fcmToken;

    @ElementCollection
    private List<Long> favoriteJobList;
    public void updateFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }


}
