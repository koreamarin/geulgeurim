package com.geulgrim.common.recruitserver.presentation;

import com.geulgrim.common.recruitserver.application.dto.response.FavoriteJobsResponseDto;
import com.geulgrim.common.recruitserver.application.dto.response.JobResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "eureka-client-recruit", url = "http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8084")
public interface RecruitFeignClient {

    @GetMapping("/api/v1/recruit/star")
    public FavoriteJobsResponseDto getStars(@RequestHeader(name = "user_id") String userId);
}
