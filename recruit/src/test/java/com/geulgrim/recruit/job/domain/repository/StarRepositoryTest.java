package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.*;
import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.ExperienceTypeEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class StarRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private FirstLocateRepository firstLocateRepository;

    @Autowired
    private SecondLocateRepository secondLocateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private StarRepository starRepository;

    @DisplayName("유저 아이디와 Job 객체로 Star 객체를 조회한다.")
    @Test
    void findByJobAndUserId() {
        // given
        FirstLocate firstLocate = FirstLocate.builder().firstLocateKey(101000L).firstLocateName("서울전체").build();
        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate = SecondLocate.builder().secondLocateKey(101010L).firstLocate(firstLocate).secondLocateName("강남구").build();
        secondLocateRepository.save(secondLocate);

        Job job = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓",
                "https://www.lionrocket.ai/",
                "풀타임",
                ExperienceTypeEnum.경력무관,
                3,
                EducationEnum.학력무관,
                "자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공",
                "합격 통보 날짜 2024년 7월 30일 이메일 통보",
                "신입 연봉 3000만원, 경력 연봉 3500만원",
                CloseType.채용시,
                OpenStatus.PUBLIC,
                "",
                null,
                null
        );
        jobRepository.save(job);

        Star star = Star.builder().job(job).userId(1L).build();
        starRepository.save(star);

        // when
        Star findStar = starRepository.findByJobAndUserId(job, 1L).orElseThrow();

        // then
        assertThat(findStar)
                .extracting("job.title", "job.companyName", "job.jobType", "job.experienceType", "job.minExperience", "job.education", "job.perk", "job.procedureInfo", "job.salary", "job.closeType", "job.openStatus")
                .containsExactly("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "(주)라이언로켓", "풀타임", ExperienceTypeEnum.경력무관, 3, EducationEnum.학력무관, "자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공", "합격 통보 날짜 2024년 7월 30일 이메일 통보", "신입 연봉 3000만원, 경력 연봉 3500만원", CloseType.채용시, OpenStatus.PUBLIC);
    }

    @DisplayName("유저아이디로 Start객체를 모두 조회한다.")
    @Test
    void findByUserId() {
        // given
        FirstLocate firstLocate = FirstLocate.builder().firstLocateKey(101000L).firstLocateName("서울전체").build();
        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate = SecondLocate.builder().secondLocateKey(101010L).firstLocate(firstLocate).secondLocateName("강남구").build();
        secondLocateRepository.save(secondLocate);

        Job job1 = createJob(
                secondLocate,
                2L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)1",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓",
                "https://www.lionrocket.ai/",
                "풀타임",
                ExperienceTypeEnum.경력무관,
                3,
                EducationEnum.학력무관,
                "자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공",
                "합격 통보 날짜 2024년 7월 30일 이메일 통보",
                "신입 연봉 3000만원, 경력 연봉 3500만원",
                CloseType.채용시,
                OpenStatus.PUBLIC,
                "",
                null,
                null
        );
        Job job2 = createJob(
                secondLocate,
                3L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)2",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓",
                "https://www.lionrocket.ai/",
                "풀타임",
                ExperienceTypeEnum.경력무관,
                3,
                EducationEnum.학력무관,
                "자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공",
                "합격 통보 날짜 2024년 7월 30일 이메일 통보",
                "신입 연봉 3000만원, 경력 연봉 3500만원",
                CloseType.채용시,
                OpenStatus.PUBLIC,
                "",
                null,
                null
        );
        jobRepository.saveAll(List.of(job1, job2));

        Star star1 = Star.builder().job(job1).userId(1L).build();
        Star star2 = Star.builder().job(job2).userId(1L).build();
        starRepository.saveAll(List.of(star1, star2));

        // when
        List<Star> findStars = starRepository.findByUserId(1L).orElseThrow();

        // then
        assertThat(findStars).hasSize((2))
                .extracting("job.title", "job.companyName", "job.jobType", "job.experienceType", "job.minExperience", "job.education", "job.perk", "job.procedureInfo", "job.salary", "job.closeType", "job.openStatus")
                .containsExactlyInAnyOrder(
                        tuple("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)1", "(주)라이언로켓", "풀타임", ExperienceTypeEnum.경력무관, 3, EducationEnum.학력무관, "자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공", "합격 통보 날짜 2024년 7월 30일 이메일 통보", "신입 연봉 3000만원, 경력 연봉 3500만원", CloseType.채용시, OpenStatus.PUBLIC),
                        tuple("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)2", "(주)라이언로켓", "풀타임", ExperienceTypeEnum.경력무관, 3, EducationEnum.학력무관, "자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공", "합격 통보 날짜 2024년 7월 30일 이메일 통보", "신입 연봉 3000만원, 경력 연봉 3500만원", CloseType.채용시, OpenStatus.PUBLIC)
                );
    }

    private Job createJob(
            SecondLocate secondLocate,
            Long userId,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String url,
            String title,
            String content,
            String companyName,
            String companyUrl,
            String jobType,
            ExperienceTypeEnum experienceType,
            int minExperience,
            EducationEnum education,
            String perk,
            String procedureInfo,
            String salary,
            CloseType closeType,
            OpenStatus openStatus,
            String fileUrl,
            Long saraminId,
            List<JobPosition> jobPositions
    ) {
        return Job.builder()
                .secondLocate(secondLocate)
                .userId(userId)
                .startDate(startDate)
                .endDate(endDate)
                .url(url)
                .title(title)
                .content(content)
                .companyName(companyName)
                .companyUrl(companyUrl)
                .jobType(jobType)
                .experienceType(experienceType)
                .minExperience(minExperience)
                .education(education)
                .perk(perk)
                .procedureInfo(procedureInfo)
                .salary(salary)
                .closeType(closeType)
                .openStatus(openStatus)
                .fileUrl(fileUrl)
                .saraminId(saraminId)
                .jobPositions(jobPositions)
                .build();
    }

}