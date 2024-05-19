package com.geulgrim.common.global.batch.config;

import com.geulgrim.common.authserver.presentation.AuthFeignClient;
import com.geulgrim.common.push.application.PushService;
import com.geulgrim.common.push.application.dto.request.PushCreateRequestDto;
import com.geulgrim.common.push.application.dto.response.PushCreateResponseDto;
import com.geulgrim.common.recruitserver.application.dto.response.SimpleJobResponseDto;
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
                log.info("확인할 유저 ={}", id);
                List<Long> favoriteJobs = recruitFeignClient.getUserFavoriteJobs(id);
                log.info("관심 공고 ids ={}", favoriteJobs);

                //관심 공고가 하나라도 있는 경우 탐색
                List<Long> jobList = new ArrayList<>();
                if (!favoriteJobs.isEmpty()) {
                    for (Long jobId : favoriteJobs) {

                        SimpleJobResponseDto jobSimple = recruitFeignClient.getJobSimple(jobId);
                        LocalDateTime endDate = jobSimple.getEndDate();
                        LocalDateTime tomorrow = LocalDateTime.now().plusDays(1);

                        log.info("jobId={}, endDate={}", jobId, endDate);
                        log.info("tomorrow={}", tomorrow);

                        if ((endDate.toLocalDate()).equals(tomorrow.toLocalDate())) {
                            log.info("!!!담긴 내일 마감 공고 ={}", jobSimple.getTitle());
                            log.info("!!!담긴 내일 마감 공고 마감날 ={}", endDate);

                            SimpleJobResponseDto favoriteJob = SimpleJobResponseDto.builder()
                                    .jobId(jobId)
                                    .title(jobSimple.getTitle())
                                    .companyName(jobSimple.getCompanyName())
                                    .startDate(jobSimple.getStartDate())
                                    .endDate(jobSimple.getEndDate())
                                    .build();

                            jobList.add(favoriteJob.getJobId());

                        }
                    }

                    //유저에 대해 마감공고 푸시 보내기
                    PushCreateResponseDto favoriteJobClosingsoon = pushService.createBatch(PushCreateRequestDto.builder()
                            .receiverId(id)
                            .favoriteJobs(jobList)
                            .domain("FAVORITE_JOB_CLOSINGSOON")
                            .build());

                    log.info("마감공고 배치 전송 ={}", favoriteJobClosingsoon.getTitle());
                    favoriteJobClosingsoon.getFavoriteJobList().stream().map(jobId -> "마감공고들: "+ jobId).toList().forEach(log::info);

                }

            }
            return RepeatStatus.FINISHED;
        });
    }


}
