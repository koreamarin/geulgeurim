package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.Resume;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class ResumeRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ResumeRepository resumeRepository;

    @DisplayName("이력서Id로 이력서를 조회한다.")
    @Test
    void findByResumeId() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(2L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");

        resumeRepository.saveAll(List.of(resume1, resume2));

        // when
        Resume findResume1 = resumeRepository.findByResumeId(1L).orElseThrow();
        Resume findResume2 = resumeRepository.findByResumeId(2L).orElseThrow();

        // then
        assertThat(findResume1)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactly("이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");

        assertThat(findResume2)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactly("이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
    }

    @DisplayName("유저아이디와 이력서 제목을 포함하는 문자열로 이력서 리스트를 조회한다.")
    @Test
    void findByUserIdAndResumeTitleContaining() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(1L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Resume resume3 = createResume(1L, "이력서 타이틀", "자기소개서3", OpenStatus.PUBLIC, "파일경로3");

        resumeRepository.saveAll(List.of(resume1, resume2, resume3));

        // when
        Sort sqlSort = Sort.by(Sort.Direction.ASC, "updatedAt");
        List<Resume> findResumes1 = resumeRepository.findByUserIdAndResumeTitleContaining(1L, "제목", sqlSort);
        List<Resume> findResumes2 = resumeRepository.findByUserIdAndResumeTitleContaining(1L, "타이틀", sqlSort);

        // then
        assertThat(findResumes1)
                .hasSize(2)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1"),
                        tuple("이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2")
                );

        assertThat(findResumes2)
                .hasSize(1)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("이력서 타이틀", "자기소개서3", OpenStatus.PUBLIC, "파일경로3")
                );
    }

    @DisplayName("유저아이디와 이력서 내용을 포함하는 문자열로 이력서 리스트를 조회한다.")
    @Test
    void findByUserIdAndEssayContaining() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(1L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Resume resume3 = createResume(1L, "이력서 제목3", "자소서3", OpenStatus.PUBLIC, "파일경로3");

        resumeRepository.saveAll(List.of(resume1, resume2, resume3));

        // when
        Sort sqlSort = Sort.by(Sort.Direction.ASC, "updatedAt");
        List<Resume> findResumes1 = resumeRepository.findByUserIdAndEssayContaining(1L, "자기소개서", sqlSort);
        List<Resume> findResumes2 = resumeRepository.findByUserIdAndEssayContaining(1L, "자소서", sqlSort);

        // then
        assertThat(findResumes1)
                .hasSize(2)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1"),
                        tuple("이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2")
                );

        assertThat(findResumes2)
                .hasSize(1)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("이력서 제목3", "자소서3", OpenStatus.PUBLIC, "파일경로3")
                );
    }

    @DisplayName("유저아이디를 이용하여 이력서를 조회한다.")
    @Test
    void findByUserId() {
        // given
        Resume resume1 = createResume(1L, "이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1");
        Resume resume2 = createResume(1L, "이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2");
        Resume resume3 = createResume(2L, "이력서 제목3", "자기소개서3", OpenStatus.PUBLIC, "파일경로3");
        resumeRepository.saveAll(List.of(resume1, resume2, resume3));

        // when
        Sort sqlSort = Sort.by(Sort.Direction.ASC, "updatedAt");
        List<Resume> findResumes1 = resumeRepository.findByUserId(1L, sqlSort);
        List<Resume> findResumes2 = resumeRepository.findByUserId(2L, sqlSort);

        // then
        assertThat(findResumes1)
                .hasSize(2)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("이력서 제목1", "자기소개서1", OpenStatus.PRIVATE, "파일경로1"),
                        tuple("이력서 제목2", "자기소개서2", OpenStatus.PUBLIC, "파일경로2")
                );

        assertThat(findResumes2)
                .hasSize(1)
                .extracting("resumeTitle", "essay", "openStatus", "fileUrl")
                .containsExactlyInAnyOrder(
                        tuple("이력서 제목3", "자기소개서3", OpenStatus.PUBLIC, "파일경로3")
                );

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