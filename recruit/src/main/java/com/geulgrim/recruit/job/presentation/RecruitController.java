package com.geulgrim.recruit.job.presentation;

import com.geulgrim.recruit.job.application.dto.request.CreateResumeRequest;
import com.geulgrim.recruit.job.application.dto.response.GetResumeResponse;
import com.geulgrim.recruit.job.application.dto.response.GetResumesResponses;
import com.geulgrim.recruit.job.application.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RecruitController {
    private final ResumeService resumeService;

    @PostMapping("/resume")
    public ResponseEntity<?> createResume(      // 내 이력서 등록
            @RequestHeader HttpHeaders headers,
            @RequestBody CreateResumeRequest createResumeRequest) {
        Map<String, Long> map = resumeService.createResume(headers, createResumeRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/resume")
    public ResponseEntity<?> getResumes(     // 내 이력서 전체 조회
            @RequestHeader HttpHeaders headers) {
        GetResumesResponses GetResumesResponses = resumeService.getResumes(headers);
        return new ResponseEntity<>(GetResumesResponses, HttpStatus.OK);
    }

    @GetMapping("/resume/{resumeId}")
    public ResponseEntity<?> getResume(      // 내 이력서 상세 조회
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId) {

        GetResumeResponse getResumeResponse = resumeService.getResume(headers, resumeId);
        return new ResponseEntity<>(getResumeResponse, HttpStatus.OK);
    }
}
