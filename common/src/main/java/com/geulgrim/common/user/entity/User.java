package com.geulgrim.common.user.entity;

import com.geulgrim.common.global.entity.BaseEntity;
import com.geulgrim.common.user.entity.enums.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

import static jakarta.persistence.EnumType.STRING;

@Entity
public class User {

    @Id
    private Long userId;
    private String email;
    private String birthday;
    private String name;
    private String wallet;
    @Enumerated(STRING)
    private UserType userType;
    private String phoneNum;


}
