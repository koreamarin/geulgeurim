package com.geulgrim.common.authserver.presentation;

import com.geulgrim.common.authserver.application.dto.response.IndividualUsersResponseDto;
import com.geulgrim.common.authserver.application.dto.response.UserResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "eureka-client-auth", url = "http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8085")
public interface AuthFeignClient {

    @GetMapping("/api/v1/auth/users")
    IndividualUsersResponseDto findAll();

    @GetMapping("/api/v1/auth/user")
    UserResponseDto getUser();

    @GetMapping("/api/v1/auth/rcvuser/{id}")
    UserResponseDto getRcvUser(@PathVariable("id") Long rcvUserId);
}
