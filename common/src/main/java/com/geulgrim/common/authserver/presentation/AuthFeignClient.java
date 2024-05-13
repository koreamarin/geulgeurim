package com.geulgrim.common.authserver.presentation;

import com.geulgrim.common.authserver.application.dto.response.IndividualUserResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "eureka-client-auth", url = "http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8085")
public interface AuthFeignClient {

    @GetMapping("/api/v1/Auth/getFavoriteJobs")
    public List<IndividualUserResponseDto> findAll();
}
