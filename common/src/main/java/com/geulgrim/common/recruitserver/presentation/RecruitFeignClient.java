package com.geulgrim.common.recruitserver.presentation;

import com.geulgrim.common.recruitserver.application.dto.response.SimpleJobResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "eureka-client-recruit", url = "https://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8084")
public interface RecruitFeignClient {

    @GetMapping("/api/v1/recruit/userstars/{id}")
    List<Long> getUserFavoriteJobs(@PathVariable Long id); //특정 유저의 관심공고 id 리스트를 가져옵니다

    @GetMapping("/api/v1/recruit/jobsimple/{id}")
    SimpleJobResponseDto getJobSimple(@PathVariable("id") Long jobId);
}
