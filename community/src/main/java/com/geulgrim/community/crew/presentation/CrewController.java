package com.geulgrim.community.crew.presentation;

import com.geulgrim.community.crew.application.dto.request.CrewBoardModifyRequest;
import com.geulgrim.community.crew.application.dto.request.CrewBoardRequest;
import com.geulgrim.community.crew.application.dto.request.CrewJoinRequest;
import com.geulgrim.community.crew.application.dto.request.CrewReply;
import com.geulgrim.community.crew.application.dto.response.*;
import com.geulgrim.community.crew.application.service.CrewService;
import com.geulgrim.community.global.s3.AwsS3Service;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/community/crew")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CrewController {

    private final CrewService crewService;
    private final AwsS3Service s3UploadService;


    @GetMapping("/search")
    @Operation(summary = "크루모집 게시판 검색", description = "크루 모집 게시판의 게시글을 검색합니다.")
    public Page<CrewListResponse> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String sort,
            Pageable pageable) {
        return crewService.search(keyword, searchType, sort, pageable);
    }



    @GetMapping("/detail/{crew_id}")
    @Operation(summary = "크루모집 게시글 상세 조회", description = "크루모집 게시판의 게시글을 상세 조회합니다.")
    public ResponseEntity<CrewBoardDetail> getCrewBoardDetail(
            @RequestHeader HttpHeaders headers,
            @PathVariable("crew_id") Long crewId
    ) {
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 5;
        CrewBoardDetail detail = crewService.getCrewBoardDetail(crewId, userId);
        return ResponseEntity.ok(detail);
    }


    @PostMapping("")
    @Operation(summary = "크루모집 게시글 등록", description = "크루모집 게시판에 게시글을 등록합니다.")
    public ResponseEntity<Long> addCrewBoard(
            @RequestHeader HttpHeaders headers,
            @RequestPart CrewBoardRequest crewBoardRequest,
            @RequestPart(required = false) List<MultipartFile> files
    ) {
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 32;
        crewBoardRequest.setImageList(files);
        Long crewId = crewService.addCrewBoard(userId, crewBoardRequest);
        return ResponseEntity.ok(crewId);
    }


    @PutMapping("{crewId}")
    @Operation(summary = "크루모집 게시글 수정", description = "크루모집 게시판의 게시글을 수정합니다.")
    public ResponseEntity<String> update(
            @PathVariable("crewId") Long crewId,
            @RequestBody CrewBoardModifyRequest modifyRequest
    ) {
        String result = crewService.update(crewId, modifyRequest);
        return ResponseEntity.ok(result);
    }


    @DeleteMapping("/{crewId}")
    @Operation(summary = "크루모집 게시글 삭제", description = "크루모집 게시판의 게시글을 삭제합니다.")
    public ResponseEntity<String> delete(
            @PathVariable("crewId") Long crewId
    ) {
        String result = crewService.delete(crewId);
        return ResponseEntity.ok(result);
    }


    @PostMapping("/request/{crewId}")
    @Operation(summary = "크루 지원", description = "크루에 지원합니다.")
    public ResponseEntity<Long> apply(@RequestHeader HttpHeaders headers,
                                      @RequestBody CrewJoinRequest crewJoinRequest,
                                      @PathVariable("crewId") Long crewId) {

        long userId = Long.parseLong(headers.get("user_id").get(0));
        Long crewRequestId = crewService.apply(crewId, crewJoinRequest, userId);
        return ResponseEntity.ok(crewRequestId);
    }



    @GetMapping("/request/{crew_id}")
    @Operation(summary = "크루 모집 신청자 조회", description = "크루 모집 신청자를 전체 조회합니다.")
    public ResponseEntity<List<CrewApplicant>> getCrewApplicants(
            @PathVariable("crew_id") Long crewId
    ) {
        List<CrewApplicant> crewApplicants = crewService.getCrewApplicants(crewId);
        return ResponseEntity.ok(crewApplicants);
    }


    @PutMapping("/request/reply/{crew_request_id}")
    @Operation(summary = "크루 지원에 대한 답변", description = "크루 신청을 승인 또는 거절합니다.")
    public ResponseEntity<Long> reply(
            @PathVariable("crew_request_id") Long requestId,
            @RequestBody CrewReply crewReply
    ) {
        Long crewId = crewService.reply(requestId, crewReply);
        return ResponseEntity.ok(crewId);
    }

    @GetMapping("/mycrew")
    @Operation(summary = "내가 쓴 크루 목록", description = "내가 쓴 크루 모집 글 목록을 가져옵니다.")
    public Page<MyCrewListResponse> getMyCrewList(@RequestHeader HttpHeaders headers,
                                                                  Pageable pageable) {
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 5;
        return crewService.getMyCrewList(userId, pageable);
    }

    @GetMapping("/myapply")
    @Operation(summary = "내가 쓴 크루 지원서 목록", description = "내가 쓴 크루 지원서 목록을 가져옵니다.")
    public Page<MyApplyListResponse> getMyApplyList(@RequestHeader HttpHeaders headers,
                                                  Pageable pageable) {
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 5;
        return crewService.getMyApplyList(userId, pageable);
    }

    @PutMapping("/accept")
    public ResponseEntity<List<CrewInfo>> accept(@RequestParam Long crewRequestId,
                                    @RequestParam Long crewId) {
        List<CrewInfo> list = crewService.acceptCrewRequest(crewRequestId, crewId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/refuse")
    public ResponseEntity<List<CrewInfo>> refuse(@RequestParam Long crewRequestId,
                                    @RequestParam Long crewId) {
        List<CrewInfo> list = crewService.refuseCrewRequest(crewRequestId, crewId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
