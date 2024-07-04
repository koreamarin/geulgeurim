package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Award;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.ResumePortfolio;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class ResumePorfolioRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ResumePorfolioRepository resumePorfolioRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @DisplayName("이력서에 연결되어있는 포트폴리오 정보를 모두 조회한다.")
    @Test
    void findByResume() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PUBLIC, "파일경로1");
        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2");
        resumeRepository.saveAll(List.of(resume1, resume2));

        ResumePortfolio resumePortfolio1 = createResumePortfolio(resume1, 10L);
        ResumePortfolio resumePortfolio2 = createResumePortfolio(resume1, 11L);
        ResumePortfolio resumePortfolio3 = createResumePortfolio(resume2, 12L);
        ResumePortfolio resumePortfolio4 = createResumePortfolio(resume2, 13L);
        resumePorfolioRepository.saveAll(List.of(resumePortfolio1, resumePortfolio2, resumePortfolio3, resumePortfolio4));

        // when
        List<ResumePortfolio> resumes1 = resumePorfolioRepository.findByResume(resume1).orElseThrow();
        List<ResumePortfolio> resumes2 = resumePorfolioRepository.findByResume(resume2).orElseThrow();

        // then
        assertThat(resumes1).hasSize(2)
                .extracting("resume", "pofolId")
                .containsExactlyInAnyOrder(
                        tuple(resume1, 10L),
                        tuple(resume1, 11L)
                );

        assertThat(resumes2).hasSize(2)
                .extracting("resume", "pofolId")
                .containsExactlyInAnyOrder(
                        tuple(resume2, 12L),
                        tuple(resume2, 13L)
                );
    }

    @DisplayName("이력서와 포트폴리오 아이디로 포트폴리오 정보를 조회한다.")
    @Test
    void findByResumeAndPofolId() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PUBLIC, "파일경로1");
        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2");
        resumeRepository.saveAll(List.of(resume1, resume2));

        ResumePortfolio resumePortfolio1 = createResumePortfolio(resume1, 10L);
        ResumePortfolio resumePortfolio2 = createResumePortfolio(resume1, 11L);
        ResumePortfolio resumePortfolio3 = createResumePortfolio(resume2, 12L);
        ResumePortfolio resumePortfolio4 = createResumePortfolio(resume2, 13L);
        resumePorfolioRepository.saveAll(List.of(resumePortfolio1, resumePortfolio2, resumePortfolio3, resumePortfolio4));

        // when
        ResumePortfolio findResumePortfolio1 = resumePorfolioRepository.findByResumeAndPofolId(resume1, 10L).orElseThrow();
        ResumePortfolio findResumePortfolio2 = resumePorfolioRepository.findByResumeAndPofolId(resume1, 11L).orElseThrow();
        ResumePortfolio findResumePortfolio3 = resumePorfolioRepository.findByResumeAndPofolId(resume2, 12L).orElseThrow();
        ResumePortfolio findResumePortfolio4 = resumePorfolioRepository.findByResumeAndPofolId(resume2, 13L).orElseThrow();

        // then
        assertThat(findResumePortfolio1)
                .extracting("resume", "pofolId")
                .containsExactly(resume1, 10L);

        assertThat(findResumePortfolio2)
                .extracting("resume", "pofolId")
                .containsExactly(resume1, 11L);

        assertThat(findResumePortfolio3)
                .extracting("resume", "pofolId")
                .containsExactly(resume2, 12L);

        assertThat(findResumePortfolio4)
                .extracting("resume", "pofolId")
                .containsExactly(resume2, 13L);
    }

    @DisplayName("포트폴리오 아이디로 포트폴리오 정보를 조회한다.")
    @Test
    void findByPofolId() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PUBLIC, "파일경로1");
        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PRIVATE, "파일경로2");
        resumeRepository.saveAll(List.of(resume1, resume2));

        ResumePortfolio resumePortfolio1 = createResumePortfolio(resume1, 10L);
        ResumePortfolio resumePortfolio2 = createResumePortfolio(resume1, 11L);
        ResumePortfolio resumePortfolio3 = createResumePortfolio(resume2, 10L);
        ResumePortfolio resumePortfolio4 = createResumePortfolio(resume2, 11L);
        resumePorfolioRepository.saveAll(List.of(resumePortfolio1, resumePortfolio2, resumePortfolio3, resumePortfolio4));

        // when
        List<ResumePortfolio> findResumePortfolio1 = resumePorfolioRepository.findByPofolId(10L).orElseThrow();
        List<ResumePortfolio> findResumePortfolio2 = resumePorfolioRepository.findByPofolId(11L).orElseThrow();

        // then
        assertThat(findResumePortfolio1).hasSize(2)
                .extracting("resume", "pofolId")
                .containsExactlyInAnyOrder(
                        tuple(resume1, 10L),
                        tuple(resume2, 10L)
                );

        assertThat(findResumePortfolio2).hasSize(2)
                .extracting("resume", "pofolId")
                .containsExactlyInAnyOrder(
                        tuple(resume1, 11L),
                        tuple(resume2, 11L)
                );
    }

    private ResumePortfolio createResumePortfolio(Resume resume, Long pofolId) {
        return ResumePortfolio.builder()
                .resume(resume)
                .pofolId(pofolId)
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