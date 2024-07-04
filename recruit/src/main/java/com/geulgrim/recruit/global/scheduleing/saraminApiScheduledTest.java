package com.geulgrim.recruit.global.scheduleing;

import com.fasterxml.jackson.databind.JsonNode;
import com.geulgrim.recruit.job.application.dto.request.CreateJobRequest;
import com.geulgrim.recruit.job.application.dto.saramin.JobResponse;
import com.geulgrim.recruit.job.application.dto.saramin.JobsResponse;
import com.geulgrim.recruit.job.application.dto.saramin.SaraminApiResponse;
import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.ExperienceTypeEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Job;
import com.geulgrim.recruit.job.domain.entity.JobPosition;
import com.geulgrim.recruit.job.domain.entity.Position;
import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import com.geulgrim.recruit.job.domain.repository.JobPositionRepository;
import com.geulgrim.recruit.job.domain.repository.JobRepository;
import com.geulgrim.recruit.job.domain.repository.PositionRepository;
import com.geulgrim.recruit.job.domain.repository.SecondLocateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

//@Component
@RequiredArgsConstructor
public class saraminApiScheduledTest {
    private final SecondLocateRepository secondLocateRepository;
    private final WebClient webClient = WebClient.builder().build();
    private final JobRepository jobRepository;
    private final JobPositionRepository jobPositionRepository;
    private final PositionRepository positionRepository;

    @Value("${spring.saramin.key}")
    private String saraminAPIKey;

    @Scheduled(fixedRate = 1000 * 60 * 60 * 3)
    public void saramindbUpdate() throws UnsupportedEncodingException {
            String uri = "oapi.saramin.co.kr/job-search";
            String accessKeyQueryString = "?access-key=" + saraminAPIKey;
            String keyword = "웹툰,작가,작화,콘티,채색";
            String keywordQueryString = "&keywords="+keyword;
            String countQueryString = "&count=20";
            String apiURL = "https://" + uri + accessKeyQueryString + keywordQueryString + countQueryString;
//            String apiURL = "http://localhost:8080/api/v1/recruit/test2";

            SaraminApiResponse response = webClient.get()
                .uri(apiURL)
                .header("Accept", "application/json")
                .retrieve()
                .bodyToMono(SaraminApiResponse.class)
                .block();

            List<JobResponse> jobResponses = response.getJobs().getJob();

            for(int i = 0; i < jobResponses.size(); i++) {
                JobResponse jobResponse = jobResponses.get(i);
                Long saraminId = jobResponse.getId();

                if(jobRepository.findBySaraminId(saraminId).orElse(null) != null) continue;

                SecondLocate secondLocate = secondLocateRepository
                        .findBySecondLocateKey(
                                Long.valueOf(
                                        jobResponse
                                                .getPosition()
                                                .getLocation()
                                                .getCode().split(",")[0]))
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 2차 지역 입니다."));

                ExperienceTypeEnum experienceTypeEnum = switch (jobResponse.getPosition().getExperienceLevel().getName()) {
                    case "신입" -> ExperienceTypeEnum.신입;
                    case "경력" -> ExperienceTypeEnum.경력;
                    case "신입/경력" -> ExperienceTypeEnum.신입_경력;
                    case "경력무관" -> ExperienceTypeEnum.경력무관;
                    default -> ExperienceTypeEnum.경력;
                };
                System.out.println(jobResponse.getPosition().getExperienceLevel());
                System.out.println("이거맞아?: " + jobResponse.getPosition().getExperienceLevel().getCode());
                System.out.println("이거맞아?: " + experienceTypeEnum);

                EducationEnum educationEnum = switch (jobResponse.getPosition().getRequiredEducationLevel().getCode()) {
                    case "0" -> EducationEnum.학력무관;
                    case "1" -> EducationEnum.고등학교졸업;
                    case "2" -> EducationEnum.대학졸업_2_3년;
                    case "3" -> EducationEnum.대학교졸업_4년;
                    case "4" -> EducationEnum.석사졸업;
                    case "5" -> EducationEnum.박사졸업;
                    case "6" -> EducationEnum.고등학교졸업이상;
                    case "7" -> EducationEnum.대학졸업_2_3년이상;
                    case "8" -> EducationEnum.대학교졸업_4년이상;
                    case "9" -> EducationEnum.석사졸업이상;
                    default -> EducationEnum.학력무관;
                };

                CloseType closeType = switch (jobResponse.getCloseType().getCode()) {
                    case "1" -> CloseType.접수마감일;
                    case "2" -> CloseType.채용시;
                    case "3" -> CloseType.상시;
                    case "4" -> CloseType.수시;
                    default -> CloseType.접수마감일;
                };

                OpenStatus openStatus = switch (jobResponse.getActive()) {
                    case 0 -> OpenStatus.PRIVATE;
                    case 1 -> OpenStatus.PUBLIC;
                    default -> OpenStatus.PUBLIC;
                };


                long unixTimestamp = Long.parseLong(jobResponse.getPostingTimestamp());
                LocalDateTime startDateTime = LocalDateTime.ofInstant(
                        Instant.ofEpochSecond(
                                Long.parseLong(jobResponse.getPostingTimestamp())
                        ), ZoneId.systemDefault());
                LocalDateTime endDateTime = LocalDateTime.ofInstant(
                        Instant.ofEpochSecond(
                                Long.parseLong(jobResponse.getExpirationTimestamp())
                        ), ZoneId.systemDefault());

                Job job = Job.builder()
                    .secondLocate(secondLocate)
                    .userId(41L)
                    .startDate(startDateTime)
                    .endDate(endDateTime)
                    .url(jobResponse.getUrl())
                    .title(jobResponse.getPosition().getTitle())
                    .content(jobResponse.getKeyword())
                    .companyName(jobResponse.getCompany().getDetail().getName())
                    .companyUrl(jobResponse.getCompany().getDetail().getHref())
                    .jobType(jobResponse.getPosition().getJobType().getName())
                    .experienceType(experienceTypeEnum)
                    .minExperience(jobResponse.getPosition().getExperienceLevel().getMin())
                    .education(educationEnum)
                    .perk("")
                    .procedureInfo("")
                    .salary(jobResponse.getSalary().getName())
                    .closeType(closeType)
                    .openStatus(openStatus)
                    .fileUrl("")
                    .saraminId(saraminId)
                    .build();

                jobRepository.save(job);

                // 구인구직 포지션 저장 파트
                Position position = positionRepository.findByPositionId(15L)
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));
                JobPosition jobPosition = JobPosition.builder()
                        .job(job)
                        .position(position)
                        .build();
                jobPositionRepository.save(jobPosition);
            }
    }
}
