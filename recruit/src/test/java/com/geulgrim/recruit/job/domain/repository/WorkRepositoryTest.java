package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Education;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.Work;
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
class WorkRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private WorkRepository workRepository;

    @DisplayName("이력서에 연결되어있는 경력을 모두 조회한다.")
    @Test
    void findByResume() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Work work11 = createWork(resume1, "회사명11", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), "내용11");
        Work work12 = createWork(resume1, "회사명12", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), "내용12");

        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Work work21 = createWork(resume2, "회사명21", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), "내용21");
        Work work22 = createWork(resume2, "회사명22", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), "내용22");

        workRepository.saveAll(List.of(work11, work12, work21, work22));

        // when
        List<Work> works = workRepository.findByResume(resume1).orElseThrow();

        // then
        assertThat(works).hasSize(2)
                .extracting("resume", "company", "startDate", "endDate", "content")
                .containsExactlyInAnyOrder(
                        tuple(resume1, "회사명11", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), "내용11"),
                        tuple(resume1, "회사명12", LocalDateTime.parse("2021-01-01T00:00:00"), LocalDateTime.parse("2021-01-01T00:00:00"), "내용12")
                );
    }

    private Work createWork(Resume resume, String company, LocalDateTime startDate, LocalDateTime endDate, String content) {
        return Work.builder()
                .resume(resume)
                .company(company)
                .startDate(startDate)
                .endDate(endDate)
                .content(content)
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