package com.geulgrim.recruit.job.application.service;

import com.geulgrim.recruit.global.S3.AwsS3Service;
import com.geulgrim.recruit.job.application.dto.request.*;
import com.geulgrim.recruit.job.application.dto.response.*;
import com.geulgrim.recruit.job.domain.entity.*;
import com.geulgrim.recruit.job.domain.entity.Enums.*;
import com.geulgrim.recruit.job.domain.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {
    private final ResumeRepository resumeRepository;
    private final PositionRepository positionRepository;
    private final ResumePositionRepository resumePositionRepository;
    private final ResumePorfolioRepository resumePorfolioRepository;
    private final EducationRepository educationRepository;
    private final WorkRepository workRepository;
    private final AwardRepository awardRepository;
    private final ExperienceRepository experienceRepository;
    private final SecondLocateRepository secondLocateRepository;
    private final JobRepository jobRepository;
    private final JobPositionRepository jobPositionRepository;
    private final SubmittedResumeRepository submittedResumeRepository;
    private final StarRepository starRepository;
    private final AwsS3Service awsS3Service;
    private final WebClient webClient = WebClient.builder().build(); ;


    // 구인구직 등록
    public Map<String, Long> createJob(
            HttpHeaders headers,
            CreateJobRequest createJobRequest,
            MultipartFile image_file) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        String userType = headers.get("user_type").get(0);
        if(userType.equals("INDIVIDUAL")) {
            throw new IllegalArgumentException("기업회원만 구인구직을 등록할 수 있습니다.");
        }

        SecondLocate secondLocateOptional = secondLocateRepository.findBySecondLocateKey(createJobRequest.getSecondLocateKey())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 2차 지역 입니다."));

        // 이미지 파일 업로드
        Timestamp time = new Timestamp(System.currentTimeMillis());
        String fileUrl = null;
        if(image_file.getSize()>0) {
            fileUrl = awsS3Service.uploadFile(userId, image_file, time, "job");
        }

        // 구인구직 저장 파트
        Job job = Job.builder()
                .secondLocate(secondLocateOptional)
                .userId(userId)
                .startDate(createJobRequest.getStartDate())
                .endDate(createJobRequest.getEndDate())
                .url(createJobRequest.getUrl())
                .title(createJobRequest.getTitle())
                .content(createJobRequest.getContent())
                .companyName(createJobRequest.getCompanyName())
                .companyUrl(createJobRequest.getCompanyUrl())
                .jobType(createJobRequest.getJobType())
                .experienceType(ExperienceTypeEnum.valueOf(createJobRequest.getExperienceType()))
                .minExperience(createJobRequest.getMinExperience())
                .education(EducationEnum.valueOf(createJobRequest.getEducation()))
                .perk(createJobRequest.getPerk())
                .procedureInfo(createJobRequest.getProcedureInfo())
                .salary(createJobRequest.getSalary())
                .closeType(CloseType.valueOf(createJobRequest.getCloseType()))
                .openStatus(OpenStatus.valueOf(createJobRequest.getOpenStatus()))
                .fileUrl(fileUrl)
                .build();
        jobRepository.save(job);

        // 구인구직 포지션 저장 파트
        List<Long> positionIds = createJobRequest.getPositionIds();
        for (Long positionId : positionIds) {
            Position position = positionRepository.findByPositionId(positionId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));
            JobPosition jobPosition = JobPosition.builder()
                    .job(job)
                    .position(position)
                    .build();
            jobPositionRepository.save(jobPosition);
        }

        return Map.of("jobId", job.getJobId());
    }

    // 구인구직 리스트 조회
    public GetJobsResponses getJobs(
            List<Long> positionIds,
            List<String> experienceTypes,
            List<String> closeTypes) {

        if(positionIds.isEmpty())
            positionIds = positionRepository.findAll().stream().map(Position::getPositionId).toList();

        if(experienceTypes.isEmpty())
            for(ExperienceTypeEnum experienceTypeEnum : ExperienceTypeEnum.values())
                experienceTypes.add(experienceTypeEnum.name());

        if(closeTypes.isEmpty())
            for(CloseType closeType : CloseType.values())
                closeTypes.add(closeType.name());

        List<Job> jobs = jobRepository.getJobs(positionIds, experienceTypes, closeTypes);

        List<GetJobsResponse> getJobsResponses = new ArrayList<>();

        for(Job job : jobs) {
            if(job.getOpenStatus().equals(OpenStatus.PRIVATE)) continue;
            List<Long> positionIdsResponse = new ArrayList<>();
            for(JobPosition jobPosition : job.getJobPositions()) {
                positionIdsResponse.add(jobPosition.getPosition().getPositionId());
            }

            GetJobsResponse getJobsResponse = GetJobsResponse.builder()
                    .jobId(job.getJobId())
                    .secondLocate(job.getSecondLocate())
                    .startDate(job.getStartDate())
                    .endDate(job.getEndDate())
                    .title(job.getTitle())
                    .companyName(job.getCompanyName())
                    .positionIds(positionIdsResponse)
                    .build();
            getJobsResponses.add(getJobsResponse);
        }

        return GetJobsResponses.builder()
                .getJobsResponses(getJobsResponses)
                .totalPage(getJobsResponses.size())
                .build();
    }

    // 내(기업회원)가 작성한 구인구직 리스트 조회
    public GetJobsResponses getMyJobs(
            HttpHeaders headers,
            Pageable pageable) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        String userType = headers.get("user_type").get(0);
        if(userType.equals("INDIVIDUAL")) {
            throw new IllegalArgumentException("기업회원만 구인구직을 등록할 수 있습니다.");
        }

        Page<Job> jobs = jobRepository.findByUserId(userId, pageable);
        List<GetJobsResponse> getJobsResponses = new ArrayList<>();

        for(Job job : jobs) {
            GetJobsResponse getJobsResponse = GetJobsResponse.builder()
                    .jobId(job.getJobId())
                    .secondLocate(job.getSecondLocate())
                    .startDate(job.getStartDate())
                    .endDate(job.getEndDate())
                    .title(job.getTitle())
                    .companyName(job.getCompanyName())
                    .positionIds(job.getJobPositions().stream().map(jobPosition -> jobPosition.getPosition().getPositionId()).toList())
                    .build();
            getJobsResponses.add(getJobsResponse);
        }

        return GetJobsResponses.builder()
                .getJobsResponses(getJobsResponses)
                .totalPage(getJobsResponses.size())
                .build();

    }

    // 내(개인회원)가 지원한 이력 및 공고 조회
    public GetMyApplyedJobsResponses getMyApplyedJobs(
            HttpHeaders headers) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Sort sqlSort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Resume> resumes = resumeRepository.findByUserId(userId, sqlSort);

        List<GetMyApplyedJobsResponse> getMyApplyedJobsResponses = new ArrayList<>();

        for(Resume resume : resumes) {
            List<SubmittedResume> submittedResumes = submittedResumeRepository.findByResume(resume)
                    .orElseThrow(() -> new IllegalArgumentException("지원한 구인공고가 없습니다."));

            for(SubmittedResume submittedResume : submittedResumes) {
                GetMyApplyedJobsResponse getMyApplyedJobsResponse = GetMyApplyedJobsResponse.builder()
                        .resumeUrl(submittedResume.getResumeUrl())
                        .resultStatus(submittedResume.getResultStatus().name())
                        .jobTitle(submittedResume.getJob().getTitle())
                        .position(submittedResume.getJob().getJobPositions().stream().map(jobPosition -> jobPosition.getPosition().getPositionName()).toList())
                        .companyName(submittedResume.getJob().getCompanyName())
                        .endDate(String.valueOf(submittedResume.getJob().getEndDate()))
                        .jobId(submittedResume.getJob().getJobId())
                        .build();
                getMyApplyedJobsResponses.add(getMyApplyedJobsResponse);
            }
        }

        return GetMyApplyedJobsResponses.builder()
                .getMyApplyedJobsResponses(getMyApplyedJobsResponses)
                .totalPage(getMyApplyedJobsResponses.size())
                .build();
    }

    // 구인구직 상세 조회
    public GetJobResponse getJob(
            HttpHeaders headers, Long jobId) {
        List<String> userIds = headers.get("user_id");

        long userId = 0L;

        if(userIds != null) {
            userId = Long.parseLong(userIds.get(0));
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        Boolean star = starRepository.findByJobAndUserId(job, userId).isPresent();

        List<Long> positionIds = job.getJobPositions().stream().map(jobPosition -> jobPosition.getPosition().getPositionId()).toList();

        Sort sqlSort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Resume> resumes = resumeRepository.findByUserId(userId, sqlSort);

        for(Resume resume : resumes) {
            Optional<SubmittedResume> submittedResumeOptional = submittedResumeRepository.findByJobAndResume(job, resume);
            if(submittedResumeOptional.isPresent()) {
                return GetJobResponse.builder()
                        .jobId(job.getJobId())
                        .secondLocate(job.getSecondLocate())
                        .startDate(job.getStartDate())
                        .endDate(job.getEndDate())
                        .url(job.getUrl())
                        .title(job.getTitle())
                        .content(job.getContent())
                        .companyName(job.getCompanyName())
                        .companyUrl(job.getCompanyUrl())
                        .jobType(job.getJobType())
                        .experienceType(job.getExperienceType().name())
                        .minExperience(job.getMinExperience())
                        .education(job.getEducation().name())
                        .perk(job.getPerk())
                        .procedureInfo(job.getProcedureInfo())
                        .salary(job.getSalary())
                        .closeType(job.getCloseType().name())
                        .openStatus(job.getOpenStatus().name())
                        .fileUrl(job.getFileUrl())
                        .positionIds(positionIds)
                        .star(star)
                        .applyStatus(true)
                        .build();
            }
        }

        return GetJobResponse.builder()
                .jobId(job.getJobId())
                .secondLocate(job.getSecondLocate())
                .startDate(job.getStartDate())
                .endDate(job.getEndDate())
                .url(job.getUrl())
                .title(job.getTitle())
                .content(job.getContent())
                .companyName(job.getCompanyName())
                .companyUrl(job.getCompanyUrl())
                .jobType(job.getJobType())
                .experienceType(job.getExperienceType().name())
                .minExperience(job.getMinExperience())
                .education(job.getEducation().name())
                .perk(job.getPerk())
                .procedureInfo(job.getProcedureInfo())
                .salary(job.getSalary())
                .closeType(job.getCloseType().name())
                .openStatus(job.getOpenStatus().name())
                .fileUrl(job.getFileUrl())
                .positionIds(positionIds)
                .star(star)
                .applyStatus(false)
                .build();
    }


    // 구인구직 수정 (3순위)

    // 구인구직 삭제 (2순위)

    // 구인구직 포지션 등록
    public String createJobPosition(
            HttpHeaders headers, Long jobId, Long positionId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        if (!job.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Position position = positionRepository.findByPositionId(positionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));

        // 이미 생성되어있는지 확인하는 절차
        Optional<JobPosition> jobPositionOptional = jobPositionRepository.findByJobAndPosition(job, position);
        if(jobPositionOptional.isPresent()) {    // 생성되어 있을 시
            return "생성실패"; // 이미 생성되어 있습니다.
        }

        // 생성되어 있지 않을 시
        JobPosition jobPosition = JobPosition.builder()
                .job(job)
                .position(position)
                .build();

        jobPositionRepository.save(jobPosition);

        return "생성완료";
    }

    // 구인구직 포지션 삭제
    public String deleteJobPosition(
            HttpHeaders headers, Long jobId, Long positionId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        if (!job.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Position position = positionRepository.findByPositionId(positionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));

        // 삭제할 포지션을 찾는 절차
        Optional<JobPosition> jobPositionOptional = jobPositionRepository.findByJobAndPosition(job, position);
        if(jobPositionOptional.isEmpty()) {
            return "삭제실패"; // 삭제할 포지션이 존재하지 않습니다.
        }

        // 삭제할 포지션을 삭제하는 절차
        jobPositionRepository.delete(jobPositionOptional.get());
        return "삭제완료";
    }

    // 구인구직 지원 신청
    public String submmitedJob(
            HttpHeaders headers, Long jobId, Long resumeId, MultipartFile image_file) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        // 이미 지원되어있는지 확인하는 절차
        Optional<SubmittedResume> submittedResumeOptional = submittedResumeRepository.findByJobAndResume(job, resume);
        if(submittedResumeOptional.isPresent()) {    // 지원되어 있을 시
            return "이미 해당 이력서로 지원한 공고입니다."; // 이미 지원되어 있습니다.
        }

        // 이미지 파일 업로드
        Timestamp time = new Timestamp(System.currentTimeMillis());
        String resumeUrl = null;
        if(image_file.getSize()>0) {
            resumeUrl = awsS3Service.uploadFile(userId, image_file, time, "resume");
        }

        // 지원되어 있지 않을 시
        SubmittedResume submittedResume = SubmittedResume.builder()
                .job(job)
                .resume(resume)
                .resultStatus(ResultStatus.PENDING)
                .resumeUrl(resumeUrl)
                .build();

        submittedResumeRepository.save(submittedResume);

        return "지원완료";
    }

    // 지원자 이력서 리스트 조회
    public GetSubmittedResumesResponse getSubmittedResumes(
            HttpHeaders headers, Long jobId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        if (!job.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        List<SubmittedResume> submittedResumes = submittedResumeRepository.findByJob(job)
                .orElseThrow(() -> new IllegalArgumentException("지원자가 없습니다."));

        List<GetSubmittedResumeResponse> getSubmittedResumeResponses = new ArrayList<>();
        for(SubmittedResume submittedResume : submittedResumes) {
            GetSubmittedResumeResponse getSubmittedResumeResponse = GetSubmittedResumeResponse.builder()
                    .resumeId(submittedResume.getResume().getResumeId())
                    .resultStatus(String.valueOf(submittedResume.getResultStatus()))
                    .resumeUrl(submittedResume.getResumeUrl())
                    .resumeTitle(submittedResume.getResume().getResumeTitle())
                    .build();
            getSubmittedResumeResponses.add(getSubmittedResumeResponse);
        }

        return GetSubmittedResumesResponse.builder()
                .getSubmittedResumesResponse(getSubmittedResumeResponses)
                .build();
    }

    // 지원자 합격여부 수정
    public String updateSubmittedResume(
            HttpHeaders headers, Long jobId, Long resumeId,
            UpdateSubmittedResumeRequest updateSubmittedResumeRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        if (!job.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        SubmittedResume submittedResume = submittedResumeRepository.findByJobAndResume(job, resume)
                .orElseThrow(() -> new IllegalArgumentException("해당 구인공고에 지원하지 않은 이력서입니다."));

        submittedResume.updateResultStatus(ResultStatus.valueOf(updateSubmittedResumeRequest.getResultStatus()));

        submittedResumeRepository.save(submittedResume);

        return "수정완료";
    }


    // 구인구직 관심 등록
    public String createStar(
            HttpHeaders headers, Map<String,Long> createStarRequest) {

        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(createStarRequest.get("jobId"))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        // 이미 생성되어있는지 확인하는 절차
        Optional<Star> starOptional = starRepository.findByJobAndUserId(job, userId);

        if(starOptional.isPresent()) {    // 생성되어 있을 시
            return "이미 관심등록되어 있습니다"; // 이미 생성되어 있습니다.
        }

        // 생성되어 있지 않을 시
        Star star = Star.builder()
                .job(job)
                .userId(userId)
                .build();

        starRepository.save(star);

        return "관심등록완료";
    }


    // 나의 구인구직 관심 리스트조회
    public GetStarsResponse getStars(
            HttpHeaders headers) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        List<Star> stars = starRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("관심등록한 구인구직이 없습니다."));

        List<GetJobsResponse> getJobsResponses = new ArrayList<>();
        for(Star star : stars) {
            getJobsResponses.add(GetJobsResponse.builder()
                    .jobId(star.getJob().getJobId())
                    .secondLocate(star.getJob().getSecondLocate())
                    .startDate(star.getJob().getStartDate())
                    .endDate(star.getJob().getEndDate())
                    .title(star.getJob().getTitle())
                    .companyName(star.getJob().getCompanyName())
                    .positionIds(star.getJob().getJobPositions().stream().map(jobPosition -> jobPosition.getPosition().getPositionId()).toList())
                    .build());
        }

        return GetStarsResponse.builder()
                .getJobsResponses(getJobsResponses)
                .build();
    }

    // 구인구직 관심 삭제
    public String deleteStar(
            HttpHeaders headers, Map<String,Long> deleteStarRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Job job = jobRepository.findById(deleteStarRequest.get("jobId"))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 구인구직 입니다."));

        Star star = starRepository.findByJobAndUserId(job, userId)
                .orElseThrow(() -> new IllegalArgumentException("관심등록되지 않은 구인구직입니다."));

        starRepository.delete(star);

        return "관심삭제완료";
    }
















    // 내 이력서 등록
    public Map<String, Long> createResume(
            HttpHeaders headers,
            MultipartFile image_file,
            CreateResumeRequest createResumeRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Timestamp time = new Timestamp(System.currentTimeMillis());

        String file_url = null;
        if(image_file.getSize()>0) {
            file_url = awsS3Service.uploadFile(userId, image_file, time, "resume");
        }

        // 이력서 저장 파트
        Resume resume = Resume.builder()
                .userId(userId)
                .resumeTitle(createResumeRequest.getResumeTitle())
                .essay(createResumeRequest.getEssay())
                .openStatus(OpenStatus.valueOf(createResumeRequest.getOpenStatus()))
                .fileUrl(file_url)
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

        return Map.of("resumeId", resume.getResumeId());
    }

    // 내 이력서 전체 조회
    public GetResumesResponses getResumes(
            HttpHeaders headers,
            String searchType,
            String searchWord,
            String sortType,
            String sort) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        Sort.Direction direction = sort.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sqlSort = sortType.equals("update") ? Sort.by(direction, "updatedAt") : Sort.by(direction, "createdAt");
        List<Resume> resumes = null;

        if(searchType.equals("essay")) {
            resumes = resumeRepository.findByUserIdAndEssayContaining(userId, searchWord, sqlSort);
        } else if(searchType.equals("title")) {
            resumes = resumeRepository.findByUserIdAndResumeTitleContaining(userId, searchWord, sqlSort);
        } else {
            resumes = resumeRepository.findByUserId(userId, sqlSort);
        }

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
                .createdAt(String.valueOf(resume.getCreatedAt()))
                .updatedAt(String.valueOf(resume.getUpdatedAt()))
                .build();
            getResumeResponses.add(getResumeResponse);
        }
        return GetResumesResponses.builder()
            .getResumesResponse(getResumeResponses)
            .totalPage(getResumeResponses.size())
            .build();
    }

    // 내 이력서 상세 조회
    public GetResumeResponse getResume(
            HttpHeaders headers, Long resumeId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        // 이력서 포지션 조회 파트
        Optional<List<ResumePosition>> resumePositions = resumePositionRepository.findByResume(resume);
        List<GetResumePositionResponse> getResumePositionResponses = new ArrayList<>();
        if(resumePositions.isPresent()) {
            for (ResumePosition resumePosition : resumePositions.get()) {
                GetResumePositionResponse getResumePositionResponse = GetResumePositionResponse.builder()
                        .resumePositionId(resumePosition.getPositionResumeId())
                        .positionId(resumePosition.getPosition().getPositionId())
                        .build();
                getResumePositionResponses.add(getResumePositionResponse);
            }
        }

        // 이력서 포트폴리오 조회 파트
        Optional<List<ResumePortfolio>> resumePortfolios = resumePorfolioRepository.findByResume(resume);
        List<GetResumePortfolioResponse> getResumePortfolioResponses = new ArrayList<>();
        if(resumePortfolios.isPresent()) {
            for (ResumePortfolio resumePortfolio : resumePortfolios.get()) {
                GetResumePortfolioResponse getResumePortfolioResponse = GetResumePortfolioResponse.builder()
                        .resumePofolId(resumePortfolio.getResumePofolId())
                        .pofolId(resumePortfolio.getPofolId())
                        .build();
                getResumePortfolioResponses.add(getResumePortfolioResponse);
            }
        }

        // 이력서 학력사항 조회 파트
        Optional<List<Education>> educations = educationRepository.findByResume(resume);
        List<GetEducationResponse> getEducationResponses = new ArrayList<>();
        if(educations.isPresent()) {
            for (Education education : educations.get()) {
                GetEducationResponse getEducationResponse = GetEducationResponse.builder()
                        .educationId(education.getEducationId())
                        .institutionName(education.getInstitutionName())
                        .startDate(education.getStartDate())
                        .endDate(education.getEndDate())
                        .educationStatus(education.getEducationStatus().name())
                        .gpa(education.getGpa())
                        .build();
                getEducationResponses.add(getEducationResponse);
            }
        }

        // 이력서 경력사항 조회 파트
        Optional<List<Work>> works = workRepository.findByResume(resume);
        List<GetWorkResponse> getWorkResponses = new ArrayList<>();
        if(works.isPresent()) {
            for (Work work : works.get()) {
                GetWorkResponse getWorkResponse = GetWorkResponse.builder()
                        .workId(work.getWorkId())
                        .companyName(work.getCompany())
                        .startDate(work.getStartDate())
                        .endDate(work.getEndDate())
                        .content(work.getContent())
                        .build();
                getWorkResponses.add(getWorkResponse);
            }
        }


        // 이력서 자격/어학/수상 조회 파트
        Optional<List<Award>> awards = awardRepository.findByResume(resume);
        List<GetAwardResponse> getAwardResponses = new ArrayList<>();
        if(awards.isPresent()) {
            for(Award award : awards.get()) {
                GetAwardResponse getAwardResponse = GetAwardResponse.builder()
                        .awardId(award.getAwardId())
                        .awardName(award.getAwardName())
                        .acquisitionDate(award.getAcquisitionDate())
                        .institution(award.getInstitution())
                        .score(award.getScore())
                        .build();
                getAwardResponses.add(getAwardResponse);
            }
        }

        // 이력서 경험/활동/교육 조회 파트
        Optional<List<Experience>> experiences = experienceRepository.findByResume(resume);
        List<GetExperienceResponse> getExperienceResponses = new ArrayList<>();
        if(experiences.isPresent()) {
            for(Experience experience : experiences.get()) {
                GetExperienceResponse getExperienceResponse = GetExperienceResponse.builder()
                        .experienceId(experience.getExperienceId())
                        .experienceTitle(experience.getExperienceTitle())
                        .experienceContent(experience.getExperienceContent())
                        .startDate(experience.getStartDate())
                        .endDate(experience.getEndDate())
                        .build();
                getExperienceResponses.add(getExperienceResponse);
            }
        }


        GetResumeResponse getResumeResponse = GetResumeResponse.builder()
                .resumeId(resume.getResumeId())
                .resumeTitle(resume.getResumeTitle())
                .essay(resume.getEssay())
                .openStatus(resume.getOpenStatus().name())
                .fileUrl(resume.getFileUrl())
                .resumePositionResponses(getResumePositionResponses)
                .resumePortfolioResponses(getResumePortfolioResponses)
                .educationResponses(getEducationResponses)
                .workResponses(getWorkResponses)
                .awardResponses(getAwardResponses)
                .experienceResponses(getExperienceResponses)
                .build();

        return getResumeResponse;
    }


    // 내 이력서 수정 (3순위)
    public String updateResume(
            HttpHeaders headers,
            MultipartFile image_file,
            UpdateResumeRequest updateResumeRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(updateResumeRequest.getResumeId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Timestamp time = new Timestamp(System.currentTimeMillis());

        String file_url = resume.getFileUrl();
        if (image_file.getSize() > 0) {
            file_url = awsS3Service.uploadFile(userId, image_file, time, "resume");
        }

        resume.updateResumeTitle(updateResumeRequest.getResumeTitle());
        resume.updateEssay(updateResumeRequest.getEssay());
        resume.updateOpenStatus(OpenStatus.valueOf(updateResumeRequest.getOpenStatus()));
        resume.updateFileUrl(file_url);
        resumeRepository.save(resume);

        return "수정완료";
    }


    // 내 이력서 삭제
    public String deleteResume(
            HttpHeaders headers, Long resumeId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        resumeRepository.delete(resume);

        return "삭제완료";
    }

    // 이력서 포지션 생성
    public String createResumePosition(
            HttpHeaders headers, Long resumeId, Long positionId) {

        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Position position = positionRepository.findByPositionId(positionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));

        // 이미 생성되어있는지 확인하는 절차
        Optional<ResumePosition> resumePositionOptional = resumePositionRepository.findByResumeAndPosition(resume, position);
        if(resumePositionOptional.isPresent()) {    // 생성되어 있을 시
            return "생성실패"; // 이미 생성되어 있습니다.
        }

        // 생성되어 있지 않을 시
        ResumePosition resumePosition = ResumePosition.builder()
                .resume(resume)
                .position(position)
                .build();

        resumePositionRepository.save(resumePosition);

        return "생성완료";
    }

    // 포지션 조회
    public GetPositionsResponse getPositions() {
        List<Position> positions = positionRepository.findAll();
        return GetPositionsResponse.builder()
                .positions(positions)
                .build();
    }

    // 이력서 포지션 삭제
    public String deleteResumePosition(
            HttpHeaders headers, Long resumeId, Long positionId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Position position = positionRepository.findByPositionId(positionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 positionId 입니다."));

        // 삭제할 포지션을 찾는 절차
        Optional<ResumePosition> resumePositionOptional = resumePositionRepository.findByResumeAndPosition(resume, position);
        if(resumePositionOptional.isEmpty()) {
            return "삭제실패"; // 삭제할 포지션이 존재하지 않습니다.
        }

        // 삭제할 포지션을 삭제하는 절차
        resumePositionRepository.delete(resumePositionOptional.get());
        return "삭제완료";
    }

    // 이력서 포토폴리오 생성
    public String createResumePortfolio(
            HttpHeaders headers, Long resumeId, Long pofolId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        // 이미 생성되어있는지 확인하는 절차
        Optional<ResumePortfolio> resumePortfolioOptional = resumePorfolioRepository.findByResumeAndPofolId(resume, pofolId);
        if(resumePortfolioOptional.isPresent()) {    // 생성되어 있을 시
            return "생성실패"; // 이미 생성되어 있습니다.
        }

        // 생성되어 있지 않을 시
        ResumePortfolio resumePortfolio = ResumePortfolio.builder()
                .resume(resume)
                .pofolId(pofolId)
                .build();

        resumePorfolioRepository.save(resumePortfolio);

        return "생성완료";
    }

    // 이력서 포토폴리오 삭제
    public String deleteResumePortfolio(
            HttpHeaders headers, Long resumeId, Long pofolId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        // 삭제할 포트폴리오를 찾는 절차
        Optional<ResumePortfolio> resumePortfolioOptional = resumePorfolioRepository.findByResumeAndPofolId(resume, pofolId);
        if (resumePortfolioOptional.isEmpty()) {
            return "삭제실패"; // 삭제할 포트폴리오가 존재하지 않습니다.
        }

        // 삭제할 포트폴리오를 삭제하는 절차
        resumePorfolioRepository.delete(resumePortfolioOptional.get());
        return "삭제완료";

    }

    // 이력서 포토폴리오 전체삭제
    public String deleteResumePortfolioAll(
            HttpHeaders headers, Long pofolId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        List<ResumePortfolio> resumePortfolios = resumePorfolioRepository.findByPofolId(pofolId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 이력서-포토롤리오가 존재하지 않습니다."));

        if(resumePortfolios.isEmpty()) {
            throw new IllegalArgumentException("해당하는 이력서-포토롤리오가 존재하지 않습니다.");
        }

        for(ResumePortfolio resumePortfolio : resumePortfolios) {
            Resume resume = resumePortfolio.getResume();
            System.out.println(resume.getUserId() + " " + userId);
            if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");
        }

        resumePorfolioRepository.deleteAll(resumePortfolios);
        return "이력서-포토폴리오 삭제완료";
    }


    // 학력사항 생성
    public Map<String, Long> createEducation (
            HttpHeaders headers, Long resumeId, CreateEducationRequest createEducationRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Education education = Education.builder()
                .resume(resume)
                .institutionName(createEducationRequest.getInsitutionName())
                .startDate(createEducationRequest.getStartDate())
                .endDate(createEducationRequest.getEndDate())
                .educationStatus(EducationStatus.valueOf(createEducationRequest.getEducationStatus()))
                .gpa(createEducationRequest.getGpa())
                .build();

        educationRepository.save(education);

        return Map.of("educationId", education.getEducationId());
    }

    // 학력사항 수정(3순위)


    // 학력사항 삭제
    public String deleteEducation (
            HttpHeaders headers, Long educationId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Education education = educationRepository.findById(educationId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 학력사항 입니다."));

        Resume resume = education.getResume();

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        educationRepository.delete(education);

        return "삭제완료";
    }

    // 경력사항 생성
    public Map<String, Long> createWork (
            HttpHeaders headers, Long resumeId, CreateWorkRequest createWorkRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Work work = Work.builder()
                .resume(resume)
                .company(createWorkRequest.getCompany())
                .startDate(createWorkRequest.getStartDate())
                .endDate(createWorkRequest.getEndDate())
                .content(createWorkRequest.getContent())
                .build();

        workRepository.save(work);

        return Map.of("workId", work.getWorkId());
    }

    // 경력사항 수정 (3순위)

    // 경력사항 삭제
    public String deleteWork (
            HttpHeaders headers, Long workId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 경력사항 입니다."));

        Resume resume = work.getResume();

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        workRepository.delete(work);

        return "삭제완료";
    }

    // 자격/어학/수상 생성
    public Map<String, Long> createAward (
            HttpHeaders headers, Long resumeId, CreateAwardRequest createAwardRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Award award = Award.builder()
                .resume(resume)
                .awardName(createAwardRequest.getAwardName())
                .acquisitionDate(createAwardRequest.getAcquisitionDate())
                .institution(createAwardRequest.getInstitution())
                .score(createAwardRequest.getScore())
                .build();

        awardRepository.save(award);

        return Map.of("awardId", award.getAwardId());
    }


    // 자격/어학/수상 수정 (3순위)


    // 자격/어학/수상 삭제
    public String deleteAward(
            HttpHeaders headers, Long awardId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Award award = awardRepository.findById(awardId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 자격/어학/수상 입니다."));

        Resume resume = award.getResume();

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        awardRepository.delete(award);

        return "삭제완료";
    }


    // 경험/활동/교육 생성
    public Map<String, Long> createExperience(
            HttpHeaders headers, Long resumeId, CreateExperienceRequest createExperienceRequest) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Resume resume = resumeRepository.findByResumeId(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이력서 입니다."));

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        Experience experience = Experience.builder()
                .resume(resume)
                .experienceTitle(createExperienceRequest.getExperienceTitle())
                .experienceContent(createExperienceRequest.getExperienceContent())
                .startDate(createExperienceRequest.getStartDate())
                .endDate(createExperienceRequest.getEndDate())
                .build();

        experienceRepository.save(experience);

        return Map.of("experienceId", experience.getExperienceId());
    }

    // 경험/활동/교육 수정 (3순위)

    // 경험/활동/교육 삭제
    public String deleteExperience(
            HttpHeaders headers, Long experienceId) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 경험/활동/교육 입니다."));

        Resume resume = experience.getResume();

        if (!resume.getUserId().equals(userId)) throw new IllegalArgumentException("접근 권한이 없습니다.");

        experienceRepository.delete(experience);

        return "삭제완료";
    }

    public SimpleJobResponseDto getJobSimple(Long jobId){
        Job job = jobRepository.findByJobId(jobId).orElseThrow();
        return SimpleJobResponseDto.from(job);
    }

    public List<Long> getUserFavoriteJobs(Long id) {
        List<Star> stars = starRepository.findByUserId(id).orElseThrow();
        return stars.stream()
                .map(Star::getJob)
                .map(Job::getJobId)
                .toList();
    }
}
