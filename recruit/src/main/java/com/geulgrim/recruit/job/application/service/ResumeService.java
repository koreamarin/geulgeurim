package com.geulgrim.recruit.job.application.service;

import com.geulgrim.recruit.job.application.dto.request.*;
import com.geulgrim.recruit.job.application.dto.response.GetResumePositionResponse;
import com.geulgrim.recruit.job.application.dto.response.GetResumeResponse;
import com.geulgrim.recruit.job.application.dto.response.GetResumesResponse;
import com.geulgrim.recruit.job.application.dto.response.GetResumesResponses;
import com.geulgrim.recruit.job.domain.entity.*;
import com.geulgrim.recruit.job.domain.entity.Enums.EducationStatus;
import com.geulgrim.recruit.job.domain.entity.Enums.OpenStatus;
import com.geulgrim.recruit.job.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository resumeRepository;
    private final PositionRepository positionRepository;
    private final ResumePositionRepository resumePositionRepository;
    private final ResumePorfolioRepository resumePorfolioRepository;
    private final EducationRepository educationRepository;
    private final WorkRepository workRepository;
    private final AwardRepository awardRepository;
    private final ExperienceRepository experienceRepository;

    // 내 이력서 등록
    public Map<String, Long> createResume(
            HttpHeaders headers,
            CreateResumeRequest createResumeRequest) {

        // 이력서 저장 파트
        Resume resume = Resume.builder()
                .userId(Long.parseLong(headers.get("user_id").get(0)))
                .resumeTitle(createResumeRequest.getResumeTitle())
                .essay(createResumeRequest.getEssay())
                .openStatus(OpenStatus.valueOf(createResumeRequest.getOpenStatus()))
                .fileUrl(createResumeRequest.getFileUrl())
                .build();
        resumeRepository.save(resume);

        // 이력서 포지션 저장 파트
        List<Long> positionIds = createResumeRequest.getPositionIds();
        for (Long positionId : positionIds) {
            Position position = positionRepository.findByPositionId(positionId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));
            ResumePosition resumePosition = ResumePosition.builder()
                    .resume(resume)
                    .position(position)
                    .build();
            resumePositionRepository.save(resumePosition);
        }

        // 이력서 포트폴리오 저장 파트
        List<Long> pofolIds = createResumeRequest.getPofolIds();
        for (Long pofolId : pofolIds) {
            ResumePortfolio resumePortfolio = ResumePortfolio.builder()
                    .resume(resume)
                    .pofolId(pofolId)
                    .build();
            resumePorfolioRepository.save(resumePortfolio);
        }

        // 이력서 학력사항 저장 파트
        List<CreateEducationRequest> createEducationRequests = createResumeRequest.getCreateEducationRequests();
        for (CreateEducationRequest createEducationRequest : createEducationRequests) {
            Education education = Education.builder()
                    .resume(resume)
                    .institutionName(createEducationRequest.getInsitutionName())
                    .startDate(createEducationRequest.getStartDate())
                    .endDate(createEducationRequest.getEndDate())
                    .educationStatus(EducationStatus.valueOf(createEducationRequest.getEducationStatus()))
                    .gpa(createEducationRequest.getGpa())
                    .build();
            educationRepository.save(education);
        }

        // 이력서 경력사항 저장 파트
        List<CreateWorkRequest> createWorkRequests = createResumeRequest.getCreateWorkRequests();
        for (CreateWorkRequest createWorkRequest : createWorkRequests) {
            Work work = Work.builder()
                    .resume(resume)
                    .company(createWorkRequest.getCompany())
                    .startDate(createWorkRequest.getStartDate())
                    .endDate(createWorkRequest.getEndDate())
                    .content(createWorkRequest.getContent())
                    .build();
            workRepository.save(work);
        }

        // 이력서 수상사항 저장 파트
        List<CreateAwardRequest> createAwardRequests = createResumeRequest.getCreateAwardRequests();
        for (CreateAwardRequest createAwardRequest : createAwardRequests) {
            Award award = Award.builder()
                    .resume(resume)
                    .awardName(createAwardRequest.getAwardName())
                    .acquisitionDate(createAwardRequest.getAcquisitionDate())
                    .institution(createAwardRequest.getInstitution())
                    .score(createAwardRequest.getScore())
                    .build();
            awardRepository.save(award);
        }

        // 이력서 경험사항 저장 파트
        List<CreateExperienceRequest> createExperienceRequests = createResumeRequest.getCreateExperienceRequests();
        for (CreateExperienceRequest createExperienceRequest : createExperienceRequests) {
            Experience experience = Experience.builder()
                    .resume(resume)
                    .experienceTitle(createExperienceRequest.getExperienceTitle())
                    .experienceContent(createExperienceRequest.getExperienceContent())
                    .startDate(createExperienceRequest.getStartDate())
                    .endDate(createExperienceRequest.getEndDate())
                    .build();
             experienceRepository.save(experience);
        }

        Map<String, Long> map = Map.of("resumeId", resume.getResumeId());
        return map;
    }

    // 내 이력서 전체 조회
    public GetResumesResponses getResumes(
            HttpHeaders headers) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        List<Resume> resumes = resumeRepository.findByUserId(userId);
        List<GetResumesResponse> getResumeResponses = new ArrayList<>();
        for(Resume resume : resumes) {
            Optional<List<ResumePosition>> resumePositions = resumePositionRepository.findByResume(resume);
            List<GetResumePositionResponse> getResumePositionResponses = new ArrayList<>();

            if(resumePositions.isPresent()) {
                for (ResumePosition resumePosition : resumePositions.get()) {
                    Position position = resumePosition.getPosition();
                    GetResumePositionResponse getResumePositionResponse = GetResumePositionResponse.builder()
                            .resumePositionId(resumePosition.getPositionResumeId())
                            .positionId(position.getPositionId())
                            .build();
                    getResumePositionResponses.add(getResumePositionResponse);
                }
            }

            GetResumesResponse getResumeResponse = GetResumesResponse.builder()
                .resumeId(resume.getResumeId())
                .resumeTitle(resume.getResumeTitle())
                .essay(resume.getEssay())
                .openStatus(resume.getOpenStatus().name())
                .fileUrl(resume.getFileUrl())
                .getResumePositionResponses(getResumePositionResponses)
                .build();
            getResumeResponses.add(getResumeResponse);
        }
        return GetResumesResponses.builder()
            .getResumesResponse(getResumeResponses)
            .build();
    }

    // 내 이력서 상세 조회
    public GetResumeResponse getResume(
            HttpHeaders headers, Long resumeId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        System.out.println(resume);

        GetResumeResponse getResumeResponse = GetResumeResponse.builder()
                .resumeId(resume.getResumeId())
                .resumeTitle(resume.getResumeTitle())
                .essay(resume.getEssay())
                .openStatus(resume.getOpenStatus().name())
                .fileUrl(resume.getFileUrl())
                .build();

        return getResumeResponse;
    }


}
