package com.geulgrim.recruit.job.presentation;

import com.geulgrim.recruit.job.application.dto.request.*;
import com.geulgrim.recruit.job.application.dto.response.*;
import com.geulgrim.recruit.job.application.service.ResumeService;
//import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RecruitController {
    private final ResumeService resumeService;

    // 구인구직 등록
    @PostMapping("/job")
    public ResponseEntity<?> createJob(
            @RequestHeader HttpHeaders headers,
            @RequestPart(name = "createJobRequest") CreateJobRequest createJobRequest,
            @RequestPart(name = "image_file") MultipartFile image_file) {
        Map<String, Long> map = resumeService.createJob(headers, createJobRequest, image_file);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 구인구직 리스트 조회
    @GetMapping("/joblist")
    public ResponseEntity<?> getJobs(
            @RequestParam(name = "positionIds") List<Long> positionIds,
            @RequestParam(name = "experienceTypes") List<String> experienceTypes,
            @RequestParam(name = "closeTypes") List<String> closeTypes) {
        GetJobsResponses getJobsResponses = resumeService.getJobs(positionIds, experienceTypes, closeTypes);
        return new ResponseEntity<>(getJobsResponses, HttpStatus.OK);
    }

    // 내(기업회원)가 작성한 구인구직 리스트 조회
    @GetMapping("/job/myjob")
    public ResponseEntity<?> getMyJobs(
            @RequestHeader HttpHeaders headers,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        GetJobsResponses getJobsResponses = resumeService.getMyJobs(headers, pageable);
        return new ResponseEntity<>(getJobsResponses, HttpStatus.OK);
    }

    // 내(개인회원)가 지원한 이력 및 공고 조회
    @GetMapping("/job/myapply")
    public ResponseEntity<?> getMyApplyedJobs(
            @RequestHeader HttpHeaders headers) {
        GetMyApplyedJobsResponses getMyApplyedJobsResponses = resumeService.getMyApplyedJobs(headers);
        return new ResponseEntity<>(getMyApplyedJobsResponses, HttpStatus.OK);
    }


    // 구인구직 상세 조회
    @GetMapping("/jobdetail/{jobId}")
    public ResponseEntity<?> getJob(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long jobId) {
        GetJobResponse getResumeResponse = resumeService.getJob(headers, jobId);
        return new ResponseEntity<>(getResumeResponse, HttpStatus.OK);
    }

    // 구인구직 수정 (3순위)

    // 구인구직 삭제 (2순위)

    // 구인구직 포지션 등록
    @PostMapping("/job/{jobId}/position/{positionId}")
    public ResponseEntity<?> createJobPosition(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long jobId,
            @PathVariable Long positionId) {
        String result = resumeService.createJobPosition(headers, jobId, positionId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 구인구직 포지션 삭제
    @DeleteMapping("/job/{jobId}/position/{positionId}")
    public ResponseEntity<?> deleteJobPosition(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long jobId,
            @PathVariable Long positionId) {
        String result = resumeService.deleteJobPosition(headers, jobId, positionId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    // 구인구직 신청
    @PostMapping("/job/{jobId}/submitted/{resumeId}")
    public ResponseEntity<?> createJobSubmitted(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long jobId,
            @PathVariable Long resumeId,
            @RequestPart MultipartFile image_file) {
        String result = resumeService.submmitedJob(headers, jobId, resumeId, image_file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 지원자 이력서 리스트 조회
    @GetMapping("/job/{jobId}/submitted")
    public ResponseEntity<?> getSubmittedResumes(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long jobId) {
        GetSubmittedResumesResponse getSubmittedResumesResponse = resumeService.getSubmittedResumes(headers, jobId);
        return new ResponseEntity<>(getSubmittedResumesResponse, HttpStatus.OK);
    }

    // 지원자 합격여부 수정
    @PutMapping("/job/{jobId}/submitted/{resumeId}")
    public ResponseEntity<?> updateSubmittedResume(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long jobId,
            @PathVariable Long resumeId,
            @RequestBody UpdateSubmittedResumeRequest updateSubmittedResumeRequest) {
        String result = resumeService.updateSubmittedResume(headers, jobId, resumeId, updateSubmittedResumeRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 구인구직 관심 등록
    @PostMapping("/star")
    public ResponseEntity<?> createStar(
            @RequestHeader HttpHeaders headers,
            @RequestBody Map<String,Long> createStarRequest) {
        String result = resumeService.createStar(headers, createStarRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 나의 구인구직 관심 리스트조회
    @GetMapping("/star")
    public ResponseEntity<?> getStars(
            @RequestHeader HttpHeaders headers) {
        GetStarsResponse getStarsResponse = resumeService.getStars(headers);
        return new ResponseEntity<>(getStarsResponse, HttpStatus.OK);
    }

    // 구인구직 관심 삭제
    @DeleteMapping("/star")
    public ResponseEntity<?> deleteStar(
            @RequestHeader HttpHeaders headers,
            @RequestBody Map<String,Long> deleteStarRequest) {
        String result = resumeService.deleteStar(headers, deleteStarRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    // 내 이력서 등록
    @PostMapping("/resume")
    public ResponseEntity<?> createResume(
            @RequestHeader HttpHeaders headers,
            @RequestPart MultipartFile image_file,
            @RequestPart CreateResumeRequest createResumeRequest) {
        Map<String, Long> map = resumeService.createResume(headers, image_file, createResumeRequest);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    // 내 이력서 전체 조회
    @GetMapping("/resume")
    public ResponseEntity<?> getResumes(
            @RequestHeader HttpHeaders headers,
            @RequestParam String searchType,
            @RequestParam String searchWord,
            @RequestParam String sortType,
            @RequestParam String sort) {
        GetResumesResponses getResumesResponses = resumeService.getResumes(headers, searchType, searchWord, sortType, sort);
        return new ResponseEntity<>(getResumesResponses, HttpStatus.OK);
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
    @PutMapping("/resume/{resumeId}")
    public ResponseEntity<?> updateResume(
            @RequestHeader HttpHeaders headers,
            @RequestPart UpdateResumeRequest updateResumeRequest,
            @RequestParam MultipartFile image_file) {
        String result = resumeService.updateResume(headers, image_file, updateResumeRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    // 내 이력서 삭제
    @DeleteMapping("/resume/{resumeId}")
    public ResponseEntity<?> deleteResume(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long resumeId) {
        String result = resumeService.deleteResume(headers, resumeId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


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

    // 이력서 포토폴리오 전체삭제
    @DeleteMapping("/resume/portfolio/{pofolId}")
    public ResponseEntity<?> deleteResumePortfolioAll(
            @RequestHeader HttpHeaders headers,
            @PathVariable Long pofolId) {
        String result = resumeService.deleteResumePortfolioAll(headers, pofolId);
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

    @GetMapping("/jobsimple/{id}")
    public ResponseEntity<SimpleJobResponseDto> getJobSimple(@PathVariable("id") Long jobId){
        return new ResponseEntity<>(resumeService.getJobSimple(jobId) , HttpStatus.OK);
    }

    @GetMapping("/userstars/{id}") //특정 유저의 관심공고 id 리스트를 가져옵니다
    public ResponseEntity<List<Long>> getUserFavoriteJobs(@PathVariable Long id){
        return new ResponseEntity<>(resumeService.getUserFavoriteJobs(id) ,HttpStatus.OK);
    }
}
