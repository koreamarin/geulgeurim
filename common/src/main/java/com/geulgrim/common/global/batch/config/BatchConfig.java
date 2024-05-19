package com.geulgrim.common.global.batch.config;

import com.geulgrim.common.authserver.presentation.AuthFeignClient;
import com.geulgrim.common.push.application.PushService;
import com.geulgrim.common.push.application.dto.request.PushCreateRequestDto;
import com.geulgrim.common.push.domain.FavoriteJob;
import com.geulgrim.common.recruitserver.application.dto.response.JobResponseDto;
import com.geulgrim.common.recruitserver.presentation.RecruitFeignClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class BatchConfig {

    private final PushService pushService;

    private final AuthFeignClient authFeignClient;

    private final RecruitFeignClient recruitFeignClient;

    @Bean
    public Job sendClosingSoonJob(JobRepository jobRepository, Step step) {
        return new JobBuilder("sendClosingSoonJob", jobRepository)
                .start(step).build();
    }

    @Bean
    public Step step(JobRepository jobRepository, Tasklet tasklet, PlatformTransactionManager platformTransactionManager) {
        return new StepBuilder("step", jobRepository)
                .tasklet(tasklet, platformTransactionManager).build();
    }

    @Bean
    public Tasklet tasklet() {
        return ((contribution, chunkContext) -> {
            //모든 유저의 관심공고에 대해 내일 마감공고인지 확인
            for (Long id : authFeignClient.findAll().getUserIds()) {
                List<FavoriteJob> favoriteJobs = new ArrayList<>();
                    log.info("확인할 유저 ={}", id);
                    log.info("recruitFeignClient.getStars(String.valueOf(id)).getResponses() ={}", recruitFeignClient.getStars(String.valueOf(id)).getResponses());
                List<JobResponseDto> responses = recruitFeignClient.getStars(String.valueOf(id)).getResponses();
                if (!responses.isEmpty()) {
                    log.info("관심공고 가지는 유저 ={}", id);

                    for (JobResponseDto jobs : responses) {
                        LocalDateTime endDate = jobs.getEndDate();
                        LocalDateTime tomorrow = LocalDateTime.now().plusDays(1);

                        log.info("관심 공고 ={}", jobs.getTitle());
                        log.info("관심 공고 마감 날 ={}", endDate);
                        if (endDate.isEqual(tomorrow)) {
                            log.info("!!!담긴 내일 마감 공고 ={}", jobs.getTitle());
                            log.info("!!!담긴 내일 마감 공고 마감날 ={}", endDate);
                            favoriteJobs.add(FavoriteJob.builder()
                                    .title(jobs.getTitle())
                                    .companyName(jobs.getCompanyName())
                                    .endDate(endDate)
                                    .build());
                        }

                    }

                    for (FavoriteJob favoriteJob : favoriteJobs) {
                        log.info("푸시보낼 공고 ={}", favoriteJob.getTitle());
                    }

                    //유저에 대해 마감공고 푸시 보내기
                    pushService.create(PushCreateRequestDto.builder()
                            .receiverId(id)
                            .favoriteJobs(favoriteJobs)
                            .domain("FAVORITE_JOB_CLOSINGSOON")
                            .build());
                }

            }
            return RepeatStatus.FINISHED;
        });
    }


}
