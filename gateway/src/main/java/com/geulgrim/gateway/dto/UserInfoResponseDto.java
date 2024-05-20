package com.geulgrim.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
public class UserInfoResponseDto {

    private Integer userId;

    private String userType;
}
