package com.geulgrim.common.crew.presentation;

import com.geulgrim.common.crew.application.dto.request.CrewBoardRequest;
import com.geulgrim.common.crew.application.dto.request.CrewJoinRequest;
import com.geulgrim.common.crew.application.dto.request.CrewReply;
import com.geulgrim.common.crew.application.dto.response.CrewApplicant;
import com.geulgrim.common.crew.application.dto.response.CrewBoardDetail;
import com.geulgrim.common.crew.application.service.CrewService;
import com.geulgrim.common.global.s3.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/crew")
@RestController
public class CrewController {

    private final CrewService crewService;
    private final S3UploadService s3UploadService;

    // 크루 모집 상세 조회
    @GetMapping("/detail/{crew_id}")
    public ResponseEntity<CrewBoardDetail> getCrewBoardDetail(
            @PathVariable("crew_id") Long crewId
    ) {
        CrewBoardDetail detail = crewService.getCrewBoardDetail(crewId);
        return ResponseEntity.ok(detail);
    }

    // 크루 모집 게시글 등록
    @PostMapping("/{userId}")
    public ResponseEntity<Long> addCrewBoard(
            @RequestBody CrewBoardRequest crewBoardRequest,
            @PathVariable("userId") Long userId
    ) {

        Long crewId = crewService.addCrewBoard(userId, crewBoardRequest);
        return ResponseEntity.ok(crewId);
    }

    // 크루 모집 이미지 등록
    @PostMapping("/image/{crewId}")
    public ResponseEntity<String> addCrewBoardImages(
            @PathVariable("crewId") Long crewId,
            @RequestPart(value = "crewBoardImg", required = false) ArrayList<MultipartFile> multipartFiles
    ) {
        if (multipartFiles == null || multipartFiles.isEmpty()) {
            return ResponseEntity.badRequest().body("No files uploaded");
        }

        ArrayList<String> fileUrls = new ArrayList<>();

        try {
            for (MultipartFile file : multipartFiles) {
                String fileName = s3UploadService.saveFile(file);
                fileUrls.add(fileName);
                System.out.println("Uploaded file URL: " + fileName);
            }
            crewService.addCrewBoardImages(crewId, fileUrls);
            return ResponseEntity.ok("이미지를 성공적으로 저장했습니다.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 저장에 실패했습니다.");
        }

    }

    // 크루 모집 신청
    @PostMapping("/request/{crewId}")
    public ResponseEntity<Long> apply(
            @RequestBody CrewJoinRequest crewJoinRequest,
            @PathVariable("crewId") Long crewId
    ) {

        Long crewRequestId = crewService.apply(crewId, crewJoinRequest);
        return ResponseEntity.ok(crewRequestId);
    }


    // 크루 모집 신청자 전체 조회
    @GetMapping("/request/{crew_id}")
    public ResponseEntity<List<CrewApplicant>> getCrewApplicants(
            @PathVariable("crew_id") Long crewId
    ) {
        List<CrewApplicant> crewApplicants = crewService.getCrewApplicants(crewId);
        return ResponseEntity.ok(crewApplicants);
    }

    // 크루 모집 신청에 대한 답변
    @PutMapping("/request/reply/{crew_request_id}")
    public ResponseEntity<Long> reply(
            @PathVariable("crew_request_id") Long requestId,
            @RequestBody CrewReply crewReply
    ) {
        Long crewId = crewService.reply(requestId, crewReply);
        return ResponseEntity.ok(crewId);
    }

}
