package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Education;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Resume;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class EducationRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @DisplayName("이력서에 연결되어있는 학력 정보를 모두 조회한다.")
    @Test
    void findByResume() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Education education11 = createEducation(resume1, "학교명11", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), EducationStatus.COMPLETED, BigDecimal.valueOf(4.5));
        Education education12 = createEducation(resume1, "학교명12", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), EducationStatus.ONGOING, BigDecimal.valueOf(4.5));

        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Education education21 = createEducation(resume2, "학교명21", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), EducationStatus.COMPLETED, BigDecimal.valueOf(4.5));
        Education education22 = createEducation(resume2, "학교명22", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), EducationStatus.ONGOING, BigDecimal.valueOf(4.5));

        resumeRepository.saveAll(List.of(resume1, resume2));

        educationRepository.saveAll(List.of(education11, education12, education21, education22));

        // when
        Optional<List<Education>> educations = educationRepository.findByResume(resume1);

        // then
        assertThat(educations.orElseThrow()).hasSize(2)
                .extracting("resume", "institutionName", "startDate", "endDate", "educationStatus", "gpa")
                .containsExactlyInAnyOrder(
                        tuple(resume1, "학교명11", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), EducationStatus.COMPLETED, BigDecimal.valueOf(4.5)),
                        tuple(resume1, "학교명12", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), EducationStatus.ONGOING, BigDecimal.valueOf(4.5))
                );
    }

    private Education createEducation(Resume resume, String institutionName, LocalDateTime startDate, LocalDateTime endDate, EducationStatus educationStatus, BigDecimal gpa) {
        return Education.builder()
                .resume(resume)
                .institutionName(institutionName)
                .startDate(startDate)
                .endDate(endDate)
                .educationStatus(educationStatus)
                .gpa(gpa)
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