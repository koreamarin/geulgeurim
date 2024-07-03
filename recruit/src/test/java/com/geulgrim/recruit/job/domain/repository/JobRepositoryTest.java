package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.ExperienceTypeEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.FirstLocate;
import com.geulgrim.recruit.job.domain.entity.Job;
import com.geulgrim.recruit.job.domain.entity.JobPosition;
import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class JobRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private FirstLocateRepository firstLocateRepository;

    @Autowired
    private SecondLocateRepository secondLocateRepository;

    @Autowired
    private JobRepository jobRepository;

    @DisplayName("유저 아이디와 페이지 번호와 받을 Job 객체 개수를 받아서 Job 객체 리스트를 반환한다.")
    @Test
    void findByUserId() {
        // given
        FirstLocate firstLocate = FirstLocate.builder().firstLocateKey(101000L).firstLocateName("서울전체").build();
        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate = SecondLocate.builder().secondLocateKey(101010L).firstLocate(firstLocate).secondLocateName("강남구").build();
        secondLocateRepository.save(secondLocate);

        Job job1 = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓1",
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
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓2",
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

        Job job3 = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓3",
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

        Job job4 = createJob(
                secondLocate,
                4L,
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
        Job job5 = createJob(
                secondLocate,
                5L,
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

        jobRepository.saveAll(List.of(job1, job2, job3, job4, job5));

        // when
        Long userId = 1L;
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);

        Page<Job> jobs = jobRepository.findByUserId(userId, pageable);

        // then
        assertThat(jobs).hasSize(3)
                .extracting("userId", "title", "companyName")
                .containsExactlyInAnyOrder(
                        tuple(1L, "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "(주)라이언로켓1"),
                        tuple(1L, "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "(주)라이언로켓2"),
                        tuple(1L, "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "(주)라이언로켓3")
                );
    }

    @DisplayName("사람인ID로 Job 객체를 찾아서 반환한다.")
    @Test
    void findBySaraminId() {
        // given
        FirstLocate firstLocate = FirstLocate.builder().firstLocateKey(101000L).firstLocateName("서울전체").build();
        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate = SecondLocate.builder().secondLocateKey(101010L).firstLocate(firstLocate).secondLocateName("강남구").build();
        secondLocateRepository.save(secondLocate);

        Job job1 = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓1",
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
                1L,
                null
        );
        Job job2 = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓2",
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
                2L,
                null
        );
        jobRepository.saveAll(List.of(job1, job2));

        // when
        Job findJob1 = jobRepository.findBySaraminId(1L).orElseThrow();
        Job findJob2 = jobRepository.findBySaraminId(2L).orElseThrow();

        // then
        assertThat(findJob1)
                .extracting("saraminId", "companyName")
                .containsExactly(1L, "(주)라이언로켓1");

        assertThat(findJob2)
                .extracting("saraminId", "companyName")
                .containsExactly(2L, "(주)라이언로켓2");

    }

    @DisplayName("Job ID로 Job 객체를 찾아서 반환한다.")
    @Test
    void findByJobId() {
        // given
        FirstLocate firstLocate = FirstLocate.builder().firstLocateKey(101000L).firstLocateName("서울전체").build();
        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate = SecondLocate.builder().secondLocateKey(101010L).firstLocate(firstLocate).secondLocateName("강남구").build();
        secondLocateRepository.save(secondLocate);

        Job job1 = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓1",
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
                1L,
                null
        );
        Job job2 = createJob(
                secondLocate,
                1L,
                LocalDateTime.parse("2024-05-10T00:00:00"),
                LocalDateTime.parse("2024-07-21T00:00:00"),
                "url",
                "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)",
                "그림작가 파트장, 콘티작가, 그림작가 모집",
                "(주)라이언로켓2",
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
                2L,
                null
        );
        jobRepository.saveAll(List.of(job1, job2));

        // when
        Job findJob1 = jobRepository.findByJobId(1L).orElseThrow();
        Job findJob2 = jobRepository.findByJobId(2L).orElseThrow();

        // then
        assertThat(findJob1)
                .extracting("companyName")
                .isEqualTo("(주)라이언로켓1");

        assertThat(findJob2)
                .extracting("companyName")
                .isEqualTo("(주)라이언로켓2");

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