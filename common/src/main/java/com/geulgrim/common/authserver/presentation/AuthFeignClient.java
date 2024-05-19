package com.geulgrim.common.authserver.presentation;

import com.geulgrim.common.authserver.application.dto.response.IndividualUsersResponseDto;
import com.geulgrim.common.authserver.application.dto.response.UserResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "eureka-client-auth", url = "https://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8085")
public interface AuthFeignClient {

    @GetMapping("/api/v1/auth/users")
    IndividualUsersResponseDto findAll(); //모든 개인 유저에 대한 정보를 가져옵니다

//    @GetMapping(value = "/api/v1/auth/user", headers = "user_id="userId)
//    UserResponseDto getUser(Long userId); //로그인 유저 정보를 가져옵니다
//
//    @GetMapping("/api/v1/auth/rcvuser/{id}")
//    UserResponseDto getRcvUser(@PathVariable("id") Long rcvUserId, @RequestHeader HttpHeaders headers); //알람 수신자에 대한 정보를 가져옵니다


    @GetMapping("/api/v1/auth/userinfo/{id}")
    UserResponseDto getUserInfo(@PathVariable("id") Long userId);
}
