package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Award;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Resume;
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
class AwardRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private AwardRepository awardRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @DisplayName("이력서에 연결되어있는 수상 정보를 모두 조회한다.")
    @Test
    void findByResume() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Award award11 = createAward(resume1, "수상명11", LocalDateTime.parse("2021-01-01T00:00:00"), "기관명11", "100");
        Award award12 = createAward(resume1, "수상명12", LocalDateTime.parse("2021-01-01T00:00:00"), "기관명12", "40");

        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Award award21 = createAward(resume2, "수상명21", LocalDateTime.parse("2021-01-01T00:00:00"), "기관명21", "100");
        Award award22 = createAward(resume2, "수상명22", LocalDateTime.parse("2021-01-01T00:00:00"), "기관명22", "40");

        resumeRepository.saveAll(List.of(resume1, resume2));

        awardRepository.saveAll(List.of(award11, award12, award21, award22));

        // when
        Optional<List<Award>> awards = awardRepository.findByResume(resume1);

        // then
        assertThat(awards.orElseThrow()).hasSize(2)
                .extracting("resume", "awardName", "acquisitionDate", "institution", "score")
                .containsExactlyInAnyOrder(
                        tuple(resume1, "수상명11", LocalDateTime.parse("2021-01-01T00:00:00"), "기관명11", "100"),
                        tuple(resume1, "수상명12", LocalDateTime.parse("2021-01-01T00:00:00"), "기관명12", "40")
                );
    }

    private Award createAward(Resume resume, String awardName, LocalDateTime acquisitionDate, String institution, String score) {
        return Award.builder()
                .resume(resume)
                .awardName(awardName)
                .acquisitionDate(acquisitionDate)
                .institution(institution)
                .score(score)
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