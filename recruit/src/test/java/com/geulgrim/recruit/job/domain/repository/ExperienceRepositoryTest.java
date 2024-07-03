package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Education;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Experience;
import com.geulgrim.recruit.job.domain.entity.Resume;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class ExperienceRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @DisplayName("이력서에 연결되어있는 경험 정보를 모두 조회한다.")
    @Test
    void findByResume() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Experience experience11 = createExperience(resume1, "회사명11", "직무11", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"));
        Experience experience12 = createExperience(resume1, "회사명12", "직무12", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"));

        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Experience experience21 = createExperience(resume2, "회사명21", "직무21", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"));
        Experience experience22 = createExperience(resume2, "회사명22", "직무22", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"));

        resumeRepository.saveAll(List.of(resume1, resume2));

        experienceRepository.saveAll(List.of(experience11, experience12, experience21, experience22));

        // when
        List<Experience> experiences = experienceRepository.findByResume(resume1).orElseThrow();

        // then
        assertThat(experiences).hasSize(2)
                .extracting("resume", "experienceTitle", "experienceContent", "startDate", "endDate")
                .containsExactlyInAnyOrder(
                        tuple(resume1, "회사명11", "직무11", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00")),
                        tuple(resume1, "회사명12", "직무12", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"))
                );
    }

    private Experience createExperience(Resume resume, String experienceTitle, String experienceContent, LocalDateTime startDate, LocalDateTime endDate) {
        return Experience.builder()
                .resume(resume)
                .experienceTitle(experienceTitle)
                .experienceContent(experienceContent)
                .startDate(startDate)
                .endDate(endDate)
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