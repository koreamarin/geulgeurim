package com.geulgrim.common.global.batch.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class BatchScheduler {

    private final JobLauncher jobLauncher;

    private final Job job;

//    @Scheduled(cron = "0 0 18 * * *", zone = "UTC")
//    @Scheduled(cron = "0 0/1 * * * *", zone = "UTC") //테스트 위한 1분마다 실행
    public void runJob() throws JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {
        JobParameters parameters = new JobParametersBuilder()
                .addString("jobName", "ClosingSoonJob" + System.currentTimeMillis())
                .toJobParameters();

        log.info("schedule 실행! ={}", parameters);
        jobLauncher.run(job, parameters);

    }

}
