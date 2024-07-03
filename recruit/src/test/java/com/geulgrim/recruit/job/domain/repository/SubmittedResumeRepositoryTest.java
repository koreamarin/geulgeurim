package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.*;
import com.geulgrim.recruit.job.domain.entity.Enums.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class SubmittedResumeRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private FirstLocateRepository firstLocateRepository;

    @Autowired
    private SecondLocateRepository secondLocateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private SubmittedResumeRepository submittedResumeRepository;

    @DisplayName("Job과 Resume로 제출된 이력서를 조회한다.")
    @Test
    void findByJobAndResume() {
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

        Resume resume = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        resumeRepository.save(resume);

        SubmittedResume submittedResume = SubmittedResume.builder()
                .job(job)
                .resume(resume)
                .resultStatus(ResultStatus.PENDING)
                .resumeUrl("이력서 URL")
                .build();
        submittedResumeRepository.save(submittedResume);

        // when
        SubmittedResume findSubmittedResume = submittedResumeRepository.findByJobAndResume(job, resume).orElseThrow();

        // then
        assertThat(findSubmittedResume)
                .extracting("job.title", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl")
                .containsExactly("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
    }

    @DisplayName("Job 객체로 제출된 이력서를 모두 조회한다.")
    @Test
    void findByJob() {
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

        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(1L, "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2");
        resumeRepository.saveAll(List.of(resume1,resume2));

        SubmittedResume submittedResume1 = SubmittedResume.builder()
                .job(job)
                .resume(resume1)
                .resultStatus(ResultStatus.PENDING)
                .resumeUrl("이력서1 URL")
                .build();
        SubmittedResume submittedResume2 = SubmittedResume.builder()
                .job(job)
                .resume(resume2)
                .resultStatus(ResultStatus.PENDING)
                .resumeUrl("이력서2 URL")
                .build();
        submittedResumeRepository.saveAll(List.of(submittedResume1, submittedResume2));

        // when
        List<SubmittedResume> findSubmittedResumes = submittedResumeRepository.findByJob(job).orElseThrow();

        // then
        assertThat(findSubmittedResumes)
                .hasSize(2)
                .extracting("job.title", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl", "resumeUrl")
                .containsExactlyInAnyOrder(
                        tuple("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1", "이력서1 URL"),
                        tuple("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2", "이력서2 URL")
                );
    }

    @DisplayName("Resume객체로 제출된 이력서를 모두 조회한다.")
    @Test
    void findByResume() {
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

        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(1L, "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2");
        resumeRepository.saveAll(List.of(resume1,resume2));

        SubmittedResume submittedResume1 = SubmittedResume.builder()
                .job(job)
                .resume(resume1)
                .resultStatus(ResultStatus.PENDING)
                .resumeUrl("이력서1 URL")
                .build();
        SubmittedResume submittedResume2 = SubmittedResume.builder()
                .job(job)
                .resume(resume2)
                .resultStatus(ResultStatus.PENDING)
                .resumeUrl("이력서2 URL")
                .build();
        submittedResumeRepository.saveAll(List.of(submittedResume1, submittedResume2));

        // when
        List<SubmittedResume> findSubmittedResumes1 = submittedResumeRepository.findByResume(resume1).orElseThrow();
        List<SubmittedResume> findSubmittedResumes2 = submittedResumeRepository.findByResume(resume2).orElseThrow();

        // then
        assertThat(findSubmittedResumes1).hasSize(1)
                .extracting("job.title", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl", "resumeUrl")
                .containsExactlyInAnyOrder(
                        tuple("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1", "이력서1 URL")
                );

        assertThat(findSubmittedResumes2).hasSize(1)
                .extracting("job.title", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl", "resumeUrl")
                .containsExactlyInAnyOrder(
                        tuple("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2", "이력서2 URL")
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

    private Resume createResume(Long userId, String resumeTitle, String essay, OpenStatus openStatus, String fileUrl) {
        return Resume.builder()
                .userId(userId)
                .resumeTitle(resumeTitle)
                .essay(essay)
                .openStatus(openStatus)
                .fileUrl(fileUrl)
                .build();
    }

}