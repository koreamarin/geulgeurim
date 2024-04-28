package com.geulgrim.common.user.doamin;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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


}
