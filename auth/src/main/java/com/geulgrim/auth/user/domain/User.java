package com.geulgrim.auth.user.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private Long userId;
    private String password;
    private String email;
    private String birthday;
    private String name;
    private String wallet;
    @Enumerated(STRING)
    private UserType userType;
    private String phoneNum;


}
