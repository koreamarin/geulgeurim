package com.geulgrim.recruit.job.presentation;

import com.geulgrim.recruit.job.application.dto.request.*;
import com.geulgrim.recruit.job.application.dto.response.GetPositionsResponse;
import com.geulgrim.recruit.job.application.dto.response.GetResumeResponse;
import com.geulgrim.recruit.job.application.dto.response.GetResumesResponses;
import com.geulgrim.recruit.job.application.service.ResumeService;
import jakarta.ws.rs.Path;
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

    // 구인구직 등록

    // 구인구직 리스트 조회

    // 내가 작성한 구인구직 리스트 조회

    // 구인구직 상세 조회

    // 구인구직 수정 (3순위)

    // 구인구직 삭제 (2순위)

    // 구인구직 포지션 등록

    // 구인구직 포지션 삭제

    // 구인구직 신청

    // 지원자 이력서 리스트 조회

    // 지원자 합격여부 수정

    // 구인구직 관심 등록

    // 나의 구인구직 관심 리스트조회

    // 구인구직 관심 삭제




    // 내 이력서 등록
    @PostMapping("/resume")
    public ResponseEntity<?> createResume(
            @RequestHeader HttpHeaders headers,
            @RequestBody CreateResumeRequest createResumeRequest) {
        Map<String, Long> map = resumeService.createResume(headers, createResumeRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 내 이력서 전체 조회
    @GetMapping("/resume")
    public ResponseEntity<?> getResumes(
            @RequestHeader HttpHeaders headers) {
        GetResumesResponses GetResumesResponses = resumeService.getResumes(headers);
        return new ResponseEntity<>(GetResumesResponses, HttpStatus.OK);
    }

    // 내 이력서 상세 조회
    @GetMapping("/resume/{resumeId}")
    public ResponseEntity<?> getResume(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId) {

        GetResumeResponse getResumeResponse = resumeService.getResume(headers, resumeId);
        return new ResponseEntity<>(getResumeResponse, HttpStatus.OK);
    }

    // 내 이력서 수정 (3순위)

    // 내 이력서 삭제 (2순위)

    // 이력서 포지션 생성
    @PostMapping("/resume/{resumeId}/position/{positionId}")
    public ResponseEntity<?> createResumePosition(
        @RequestHeader HttpHeaders headers,
        @PathVariable Long resumeId,
        @PathVariable Long positionId) {

        String result = resumeService.createResumePosition(headers, resumeId, positionId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 포지션 조회
    @GetMapping("/position")
    public ResponseEntity<?> getPositions(
            @RequestHeader HttpHeaders headers) {
        GetPositionsResponse getPositionsResponse = resumeService.getPositions();
        return new ResponseEntity<>(getPositionsResponse, HttpStatus.OK);
    }

    // 이력서 포지션 삭제
    @DeleteMapping("/resume/{resumeId}/position/{positionId}")
    public ResponseEntity<?> deleteResumePosition(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @PathVariable Long positionId) {
        String result = resumeService.deleteResumePosition(headers, resumeId, positionId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 이력서 포토폴리오 생성
    @PostMapping("/resume/{resumeId}/portfolio/{pofolId}")
    public ResponseEntity<?> createResumePortfolio(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @PathVariable Long pofolId) {
        String result = resumeService.createResumePortfolio(headers, resumeId, pofolId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 이력서 포토폴리오 삭제
    @DeleteMapping("/resume/{resumeId}/portfolio/{pofolId}")
    public ResponseEntity<?> deleteResumePortfolio(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @PathVariable Long pofolId) {
        String result = resumeService.deleteResumePortfolio(headers, resumeId, pofolId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 학력사항 생성
    @PostMapping("/resume/{resumeId}/education")
    public ResponseEntity<?> createEducation(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @RequestBody CreateEducationRequest createEducationRequest) {
        Map<String, Long> map = resumeService.createEducation(headers, resumeId, createEducationRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 학력사항 수정 (3순위)

    // 학력사항 삭제
    @DeleteMapping("/education/{educationId}")
    public ResponseEntity<?> deleteEducation(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long educationId) {
        String result = resumeService.deleteEducation(headers, educationId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 경력사항 생성
    @PostMapping("/resume/{resumeId}/work")
    public ResponseEntity<?> createWork(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @RequestBody CreateWorkRequest createWorkRequest) {
        Map<String, Long> map = resumeService.createWork(headers, resumeId, createWorkRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 경력사항 수정 (3순위)


    // 경력사항 삭제
    @DeleteMapping("/work/{workId}")
    public ResponseEntity<?> deleteWork(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long workId) {
        String result = resumeService.deleteWork(headers, workId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 자격/어학/수상 생성
    @PostMapping("/resume/{resumeId}/award")
    public ResponseEntity<?> createExperience(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @RequestBody CreateAwardRequest createWorkRequest) {
        Map<String, Long> map = resumeService.createAward(headers, resumeId, createWorkRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 자격/어학/수상 수정 (3순위)


    // 자격/어학/수상 삭제
    @DeleteMapping("/award/{awardId}")
    public ResponseEntity<?> deleteAward(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long awardId) {
        String result = resumeService.deleteAward(headers, awardId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 경험/활동/교육 생성
    @PostMapping("/resume/{resumeId}/experience")
    public ResponseEntity<?> createExperience(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId,
            @RequestBody CreateExperienceRequest createExperienceRequest) {
        Map<String, Long> map = resumeService.createExperience(headers, resumeId, createExperienceRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 경험/활동/교육 수정 (3순위)

    // 경험/활동/교육 삭제
    @DeleteMapping("/experience/{experienceId}")
    public ResponseEntity<?> deleteExperience(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long experienceId) {
        String result = resumeService.deleteExperience(headers, experienceId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
