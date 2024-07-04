package com.geulgrim.recruit.job.application.service;

import com.geulgrim.recruit.global.S3.AwsS3Service;
import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.application.dto.request.CreateJobRequest;
import com.geulgrim.recruit.job.application.dto.response.GetJobsResponse;
import com.geulgrim.recruit.job.application.dto.response.GetJobsResponses;
import com.geulgrim.recruit.job.domain.entity.Enums.CloseType;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.ExperienceTypeEnum;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.entity.FirstLocate;
import com.geulgrim.recruit.job.domain.entity.Job;
import com.geulgrim.recruit.job.domain.entity.Position;
import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import com.geulgrim.recruit.job.domain.repository.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

class ResumeServiceTest extends IntegrationTestSupport {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private FirstLocateRepository firstLocateRepository;

    @Autowired
    private SecondLocateRepository secondLocateRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobPositionRepository jobPositionRepository;

    @AfterEach
    void tearDown() {
        jobPositionRepository.deleteAllInBatch();
        jobRepository.deleteAllInBatch();
        secondLocateRepository.deleteAllInBatch();
        firstLocateRepository.deleteAllInBatch();
        positionRepository.deleteAllInBatch();
    }

    void initLocate() {
        FirstLocate firstLocate = FirstLocate.builder()
                .firstLocateKey(101000L)
                .firstLocateName("서울전체")
                .build();
        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate1 = SecondLocate.builder()
                .secondLocateKey(101110L)
                .firstLocate(firstLocate)
                .secondLocateName("강남구")
                .build();
        SecondLocate secondLocate2 = SecondLocate.builder()
                .secondLocateKey(101120L)
                .firstLocate(firstLocate)
                .secondLocateName("강동구")
                .build();
        SecondLocate secondLocate3 = SecondLocate.builder()
                .secondLocateKey(101130L)
                .firstLocate(firstLocate)
                .secondLocateName("강북구")
                .build();
        SecondLocate secondLocate4 = SecondLocate.builder()
                .secondLocateKey(101140L)
                .firstLocate(firstLocate)
                .secondLocateName("강서구")
                .build();
        secondLocateRepository.saveAll(List.of(secondLocate1, secondLocate2, secondLocate3, secondLocate4));
    }

    void initPosition() {
        Position position1 = Position.builder().positionName("선화").build();
        Position position2 = Position.builder().positionName("밑색").build();
        Position position3 = Position.builder().positionName("명암").build();
        Position position4 = Position.builder().positionName("후보정").build();
        Position position5 = Position.builder().positionName("작화").build();
        Position position6 = Position.builder().positionName("어시").build();
        Position position7 = Position.builder().positionName("각색").build();
        Position position8 = Position.builder().positionName("콘티").build();
        Position position9 = Position.builder().positionName("표지").build();
        Position position10 = Position.builder().positionName("삽화").build();
        Position position11 = Position.builder().positionName("배경").build();
        Position position12 = Position.builder().positionName("채색").build();
        Position position13 = Position.builder().positionName("편집").build();
        Position position14 = Position.builder().positionName("작가").build();

        positionRepository.saveAll(List.of(position1, position2, position3, position4, position5, position6, position7, position8, position9, position10, position11, position12, position13, position14));
    }

    @DisplayName("구인구직 공고를 생성한다")
    @Test
    void createJob() {
        // given
        // stubbing
        Mockito.when(awsS3Service.uploadFile(any(Long.class), any(MultipartFile.class), any(Timestamp.class), any(String.class)))
                .thenReturn("aws 성공");
        HttpHeaders headers = new HttpHeaders();
        headers.add("user_id", "1");
        headers.add("user_type", "ENTERPRISE");

        initLocate();
        initPosition();
        CreateJobRequest request = CreateJobRequest.builder()
                .secondLocateKey(101110L)
                .startDate(LocalDateTime.parse("2024-05-10T00:00:00"))
                .endDate(LocalDateTime.parse("2024-07-21T00:00:00"))
                .url("")
                .title("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)")
                .content("그림작가 파트장, 콘티작가, 그림작가 모집")
                .companyName("주)라이언로켓")
                .companyUrl("https://www.lionrocket.ai/")
                .jobType("풀타임")
                .experienceType("경력")
                .minExperience(3)
                .education("학력무관")
                .perk("자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공")
                .procedureInfo("합격 통보 날짜 2024년 5월 30일 이메일 통보")
                .salary("신입 연봉 3000만원, 경력 연봉 3500만원")
                .closeType("채용시")
                .openStatus("PUBLIC")
                .positionIds(List.of(1L, 8L, 11L, 12L))
                .build();

        MultipartFile image_file = new MockMultipartFile("file", "test.pdf", "application/pdf", "test data".getBytes());

        // when
        Map<String, Long> createJob1 = resumeService.createJob(headers, request, image_file);
        Map<String, Long> createJob2 = resumeService.createJob(headers, request, image_file);

        // then
        assertThat(createJob1)
                .extracting("jobId")
                .isEqualTo(1L);

        assertThat(createJob2)
                .extracting("jobId")
                .isEqualTo(2L);
    }

    @DisplayName("구인구직 리스트를 조회한다.")
    @Test
    void getJobs() {
        // given
        // stubbing
        Mockito.when(awsS3Service.uploadFile(any(Long.class), any(MultipartFile.class), any(Timestamp.class), any(String.class)))
                .thenReturn("aws 성공");
        HttpHeaders headers = new HttpHeaders();
        headers.add("user_id", "1");
        headers.add("user_type", "ENTERPRISE");

        initLocate();
        initPosition();
        CreateJobRequest request = CreateJobRequest.builder()
                .secondLocateKey(101110L)
                .startDate(LocalDateTime.parse("2024-05-10T00:00:00"))
                .endDate(LocalDateTime.parse("2024-07-21T00:00:00"))
                .url("")
                .title("웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)")
                .content("그림작가 파트장, 콘티작가, 그림작가 모집")
                .companyName("주)라이언로켓")
                .companyUrl("https://www.lionrocket.ai/")
                .jobType("풀타임")
                .experienceType("경력")
                .minExperience(3)
                .education("학력무관")
                .perk("자유 출퇴근, 도서구입비 지원, 무제한 간식 지원, 직무 교육비 지원, 야근 시 택시비/반반차/식대 지원, 최신형 업무 장비 풀제공")
                .procedureInfo("합격 통보 날짜 2024년 5월 30일 이메일 통보")
                .salary("신입 연봉 3000만원, 경력 연봉 3500만원")
                .closeType("채용시")
                .openStatus("PUBLIC")
                .positionIds(List.of(1L, 8L, 11L, 12L))
                .build();

        MultipartFile image_file = new MockMultipartFile("file", "test.pdf", "application/pdf", "test data".getBytes());

        resumeService.createJob(headers, request, image_file);

        // when
        List<Long> positionIds = new ArrayList<>();
        List<String> experienceTypes = new ArrayList<>();
        List<String> closeTypes = new ArrayList<>();

        GetJobsResponses getJobsResponses = resumeService.getJobs(positionIds, experienceTypes, closeTypes);
        List<GetJobsResponse> getJobsResponseList = getJobsResponses.getGetJobsResponses();

        // then
        assertThat(getJobsResponseList)
            .hasSize(1)
            .extracting("jobId", "secondLocate.secondLocateName", "startDate", "endDate", "title", "companyName", "positionIds")
            .containsExactlyInAnyOrder(
                    tuple(1L, "강남구", LocalDateTime.parse("2024-05-10T00:00:00"), LocalDateTime.parse("2024-07-21T00:00:00"), "웹툰 제작팀 그림작가 / 콘티작가 채용 (선화/배경/컬러)", "주)라이언로켓", List.of(1L, 8L, 11L, 12L))
            );
    }
}