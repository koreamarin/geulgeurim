package com.geulgrim.community.crew.application.service;

import com.geulgrim.community.crew.application.dto.request.CrewBoardModifyRequest;
import com.geulgrim.community.crew.application.dto.request.CrewBoardRequest;
import com.geulgrim.community.crew.application.dto.request.CrewJoinRequest;
import com.geulgrim.community.crew.application.dto.request.CrewReply;
import com.geulgrim.community.crew.application.dto.response.*;
import com.geulgrim.community.crew.domain.entity.Crew;
import com.geulgrim.community.crew.domain.entity.CrewImage;
import com.geulgrim.community.crew.domain.entity.CrewRequest;
import com.geulgrim.community.crew.domain.entity.enums.CrewStatus;
import com.geulgrim.community.crew.domain.repository.CrewImageRepository;
import com.geulgrim.community.crew.domain.repository.CrewRepository;
import com.geulgrim.community.crew.domain.repository.CrewRequestRepository;
import com.geulgrim.community.crew.exception.CrewException;
import com.geulgrim.community.global.s3.AwsS3Service;
import com.geulgrim.community.global.user.domain.entity.User;
import com.geulgrim.community.global.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.geulgrim.community.crew.exception.CrewErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class CrewService {

    private final CrewRepository crewRepository;
    private final UserRepository userRepository;
    private final CrewImageRepository crewImageRepository;
    private final CrewRequestRepository crewRequestRepository;
    private final AwsS3Service awsS3Service;

    public List<CrewListResponse> findRecentCrewList() {
        PageRequest pageRequest = PageRequest.of(0, 6);
        Page<CrewListResponse> crewListPage = crewRepository.findCrewResponseList(pageRequest);
        return crewListPage.getContent();
    }

    public Page<CrewListResponse> search(String keyword, String searchType, String sort, Pageable pageable) {
        if (keyword == null || searchType == null) {
            return crewRepository.findCrewResponseList(pageable);
        }
        return crewRepository.searchCrews(keyword, searchType, sort, pageable);
    }


    public CrewBoardDetail getCrewBoardDetail(Long crewId, Long userId) {

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new CrewException(NOT_EXISTS_CREW_BOARD));
        boolean owner = Objects.equals(crew.getUser().getUserId(), userId);

        CrewBoardDetail crewBoardDetail = CrewBoardDetail.builder()
                .crewId(crew.getCrewId())
                .projectName(crew.getProjectName())
                .content(crew.getContent())
                .pen(crew.getPen())
                .color(crew.getColor())
                .bg(crew.getBg())
                .pd(crew.getPd())
                .story(crew.getStory())
                .conti(crew.getConti())
                .status(crew.getStatus())
                .createdAt(crew.getCreatedAt())
                .owner(owner)
                .build();

        // 이미지 넣기
        ArrayList<String> imageUrls = new ArrayList<>();
        ArrayList<CrewImage> crewImages = crewImageRepository.findByCrew_CrewId(crewId);
        for (CrewImage crewImage: crewImages) {
            imageUrls.add(crewImage.getFileUrl());
            log.info(crewImage.getFileUrl());
        }
        crewBoardDetail.setImages(imageUrls);

        // crew 넣기
        ArrayList<CrewInfo> realCrews = new ArrayList<>();
        List<CrewRequest> crewRequests = crewRequestRepository.findByCrew_CrewId(crewId);
        for (CrewRequest crewRequest: crewRequests) {
            if (crewRequest.getStatus() != CrewStatus.FAIL) { // 거절이 아닌 유저만 realCrews에 add
                CrewInfo crewInfo = CrewInfo.builder()
                        .crewRequestId(crewRequest.getCrewRequestId())
                        .userId(crewRequest.getUser().getUserId())
                        .nickname(crewRequest.getUser().getNickname())
                        .position(crewRequest.getPosition())
                        .message(crewRequest.getMessage())
                        .status(crewRequest.getStatus())
                        .build();
                realCrews.add(crewInfo);
            }
        }
        crewBoardDetail.setCrewInfo(realCrews);

        return crewBoardDetail;

    }


    public Long addCrewBoard(Long userId, CrewBoardRequest crewBoardRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
        // 추후 user exception 만들어서 수정해야 함

        Crew crew = Crew.builder()
                .projectName(crewBoardRequest.getProjectName())
                .user(user)
                .content(crewBoardRequest.getContent())
                .pen(crewBoardRequest.getPen())
                .color(crewBoardRequest.getColor())
                .bg(crewBoardRequest.getBg())
                .pd(crewBoardRequest.getPd())
                .story(crewBoardRequest.getStory())
                .conti(crewBoardRequest.getConti())
                .status(crewBoardRequest.getStatus())
                .build();

        crewRepository.save(crew);

        ArrayList<CrewImage> images = new ArrayList<>();
        for(MultipartFile image : crewBoardRequest.getImageList()) {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            String url = awsS3Service.uploadFile(userId, image, timestamp, "crew");
//            log.info("URL : {}", url);
            CrewImage crewImage = CrewImage.builder()
                    .crew(crew)
                    .fileUrl(url)
                    .build();
            images.add(crewImage);
        }
        crewImageRepository.saveAll(images);

        return crew.getCrewId();

    }

    public String update(Long crewId, CrewBoardModifyRequest modifyRequest) {

        Crew existingCrew = crewRepository.findById(crewId)
                .orElseThrow(() -> new CrewException(NOT_EXISTS_CREW_BOARD));

        User user = userRepository.findById(modifyRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        Crew crew = Crew.builder()
                .crewId(crewId)
                .projectName(modifyRequest.getProjectName())
                .user(user)
                .content(modifyRequest.getContent())
                .pen(modifyRequest.getPen())
                .color(modifyRequest.getColor())
                .bg(modifyRequest.getBg())
                .pd(modifyRequest.getPd())
                .story(modifyRequest.getStory())
                .conti(modifyRequest.getConti())
                .status(modifyRequest.getStatus())
                .build();

        crewRepository.save(crew);

        return "수정이 완료되었습니다.";

    }

    public String delete(Long crewId) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new CrewException(NOT_EXISTS_CREW_BOARD));

        crewRepository.delete(crew);
        return "성공적으로 삭제되었습니다.";
    }


    public Long apply(Long crewId, CrewJoinRequest crewJoinRequest, long userId) {

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new CrewException(NOT_EXISTS_CREW_BOARD));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        // 이미 지원한 신청자인지 체크
        CrewRequest existingRequest = crewRequestRepository.findByUserIdAndCrewId(userId, crewId);
        if (existingRequest != null) {
            throw new CrewException(ALREADY_SUBMITTED);
        }

        // 게시글을 만든 사람은 지원할 수 없음
        if (Objects.equals(crew.getUser().getUserId(), userId)) {
            throw new CrewException(CREATOR_CANNOT_APPLY);
        }

        CrewRequest crewRequest = crewRequestRepository.save(CrewRequest.builder()
                .crew(crew)
                .user(user)
                .position(crewJoinRequest.getPosition())
                .message(crewJoinRequest.getMessage())
                .status(CrewStatus.PENDING)
                .build());

        return crewRequest.getCrewRequestId();
    }

    public List<CrewApplicant> getCrewApplicants(Long crewId) {
        List<CrewRequest> crewRequests = crewRequestRepository.findByCrew_CrewId(crewId);

        List<CrewApplicant> crewApplicants = new ArrayList<>();

        for (CrewRequest crewRequest: crewRequests) {
//            log.info(crewRequest.getMessage());
            CrewApplicant crewApplicant = CrewApplicant.builder()
                    .userId(crewRequest.getUser().getUserId())
                    .crewRequestId(crewRequest.getCrewRequestId())
                    .position(crewRequest.getPosition())
                    .message(crewRequest.getMessage())
                    .build();
            crewApplicants.add(crewApplicant);
        }

        return crewApplicants;
    }

    public Long reply(Long requestId, CrewReply crewReply) {

        CrewRequest crewRequest = crewRequestRepository.findById(requestId)
                .orElseThrow(() -> new CrewException(NOT_EXISTS_CREW_REQUEST));

        crewRequest.setStatus(crewReply.status()); // SUCCESS, FAIL, PENDING 중 한 가지로 응답
        crewRequestRepository.save(crewRequest); // 저장

        return crewRequest.getCrewRequestId();
    }

    public Page<MyCrewListResponse> getMyCrewList(long userId, Pageable pageable) {
        return crewRepository.findMyCrewResponseList(userId, pageable);
    }

    public Page<MyApplyListResponse> getMyApplyList(long userId, Pageable pageable) {
        return crewRepository.findMyApplyResponseList(userId, pageable);
    }

    public List<CrewInfo> acceptCrewRequest(Long crewRequestId, Long crewId) {
        CrewRequest crewRequest = crewRequestRepository.findByCrewRequestId(crewRequestId);
        crewRequest.setStatus(CrewStatus.SUCCESS);
        crewRequestRepository.save(crewRequest);
        List<CrewInfo> list = new ArrayList<>();
        for(CrewRequest request : crewRequestRepository.findByCrew_CrewId(crewId)) {
            CrewInfo crewInfo = CrewInfo.builder()
                    .crewRequestId(request.getCrewRequestId())
                    .userId(request.getUser().getUserId())
                    .nickname(request.getUser().getNickname())
                    .position(request.getPosition())
                    .message(request.getMessage())
                    .status(request.getStatus())
                    .build();
            list.add(crewInfo);
        }
        return list;
    }

    public List<CrewInfo> refuseCrewRequest(Long crewRequestId, Long crewId) {
        CrewRequest crewRequest = crewRequestRepository.findByCrewRequestId(crewRequestId);
        crewRequest.setStatus(CrewStatus.FAIL);
        crewRequestRepository.save(crewRequest);
        List<CrewInfo> list = new ArrayList<>();
        for(CrewRequest request : crewRequestRepository.findByCrew_CrewId(crewId)) {
            CrewInfo crewInfo = CrewInfo.builder()
                    .crewRequestId(request.getCrewRequestId())
                    .userId(request.getUser().getUserId())
                    .nickname(request.getUser().getNickname())
                    .position(request.getPosition())
                    .message(request.getMessage())
                    .status(request.getStatus())
                    .build();
            list.add(crewInfo);
        }
        return list;
    }
}
