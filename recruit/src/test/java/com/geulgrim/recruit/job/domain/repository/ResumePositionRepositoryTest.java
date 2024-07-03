package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Position;
import com.geulgrim.recruit.job.domain.entity.Resume;
import com.geulgrim.recruit.job.domain.entity.ResumePosition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class ResumePositionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ResumePositionRepository resumePositionRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private PositionRepository positionRepository;


    @DisplayName("이력서 객체로 이력서 포지션을 조회한다.")
    @Test
    void findByResume() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        resumeRepository.save(resume1);

        Position position1 = Position.builder().positionName("선화").build();
        Position position2 = Position.builder().positionName("밑색").build();
        positionRepository.saveAll(List.of(position1, position2));

        ResumePosition resumePosition1 = ResumePosition.builder().resume(resume1).position(position1).build();
        ResumePosition resumePosition2 = ResumePosition.builder().resume(resume1).position(position2).build();
        resumePositionRepository.saveAll(List.of(resumePosition1, resumePosition2));

        // when
        List<ResumePosition> findResumePositions = resumePositionRepository.findByResume(resume1).orElseThrow();

        // then
        assertThat(findResumePositions).hasSize(2)
                .extracting("position.positionName", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("선화", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1"),
                        tuple("밑색", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1")
                );
    }

    @DisplayName("이력서 객체와 포지션 객체로 이력서 포지션을 조회한다.")
    @Test
    void findByResumeAndPosition() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        resumeRepository.saveAll(List.of(resume1, resume2));

        Position position1 = Position.builder().positionName("선화").build();
        Position position2 = Position.builder().positionName("밑색").build();
        positionRepository.saveAll(List.of(position1, position2));

        ResumePosition resumePosition1 = ResumePosition.builder().resume(resume1).position(position1).build();
        ResumePosition resumePosition2 = ResumePosition.builder().resume(resume1).position(position2).build();
        ResumePosition resumePosition3 = ResumePosition.builder().resume(resume2).position(position1).build();
        ResumePosition resumePosition4 = ResumePosition.builder().resume(resume2).position(position2).build();
        resumePositionRepository.saveAll(List.of(resumePosition1, resumePosition2, resumePosition3, resumePosition4));

        // when
        ResumePosition findResumePosition1 = resumePositionRepository.findByResumeAndPosition(resume1, position1).orElseThrow();
        ResumePosition findResumePosition2 = resumePositionRepository.findByResumeAndPosition(resume1, position2).orElseThrow();
        ResumePosition findResumePosition3 = resumePositionRepository.findByResumeAndPosition(resume2, position1).orElseThrow();
        ResumePosition findResumePosition4 = resumePositionRepository.findByResumeAndPosition(resume2, position2).orElseThrow();

        // then
        assertThat(findResumePosition1)
                .extracting("position.positionName", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl")
                .containsExactly("선화", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");

        assertThat(findResumePosition2)
                .extracting("position.positionName", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl")
                .containsExactly("밑색", "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");

        assertThat(findResumePosition3)
                .extracting("position.positionName", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl")
                .containsExactly("선화", "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");

        assertThat(findResumePosition4)
                .extracting("position.positionName", "resume.resumeTitle", "resume.essay", "resume.openStatus", "resume.fileUrl")
                .containsExactly("밑색", "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
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