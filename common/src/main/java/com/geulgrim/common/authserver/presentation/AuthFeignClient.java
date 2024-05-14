package com.geulgrim.common.authserver.presentation;

import com.geulgrim.common.authserver.application.dto.response.IndividualUsersResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "eureka-client-auth", url = "http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8085")
public interface AuthFeignClient {

    @GetMapping("/api/v1/auth/users")
    public IndividualUsersResponseDto findAll();
}
