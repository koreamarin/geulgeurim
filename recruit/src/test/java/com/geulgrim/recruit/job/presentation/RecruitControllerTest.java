package com.geulgrim.recruit.job.presentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geulgrim.recruit.job.application.dto.request.CreateJobRequest;
import com.geulgrim.recruit.job.application.service.ResumeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(controllers = {
        RecruitController.class
})
class RecruitControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ResumeService resumeService;


    @DisplayName("구인구직 공고를 등록한다.")
    @Test
    void test() throws Exception {
        // given
        HttpHeaders headers = new HttpHeaders();
        headers.add("user_id", "1");
        headers.add("user_type", "ENTERPRISE");

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

        // CreateJobRequest를 JSON 문자열로 변환
        String createJobRequestJson = objectMapper.writeValueAsString(request);

        // MockMultipartFile 생성
        MockMultipartFile createJobRequestPart = new MockMultipartFile(
                "createJobRequest",
                "createJobRequest",
                MediaType.APPLICATION_JSON_VALUE,
                createJobRequestJson.getBytes()
        );

        MockMultipartFile imageFilePart = new MockMultipartFile(
                "image_file",
                "test.pdf",
                "application/pdf",
                "test data".getBytes()
        );

//        // when // then
//        mockMvc.perform(multipart("/api/v1/jobs")
//                .file(createJobRequestPart)
//                .file(imageFilePart)
//                .headers(headers)
//                .contentType(MediaType.MULTIPART_FORM_DATA));

    }

}