package com.geulgrim.community.share.presentation;

import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.share.application.dto.request.ShareUpdateRequest;
import com.geulgrim.community.share.application.dto.request.ShareWriteRequest;
import com.geulgrim.community.share.application.dto.response.ShareDetailResponse;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import com.geulgrim.community.share.application.dto.response.ShareResponse;
import com.geulgrim.community.share.application.service.ShareCommentService;
import com.geulgrim.community.share.application.service.ShareImageService;
import com.geulgrim.community.share.application.service.ShareService;
import com.geulgrim.community.share.domain.entity.Share;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community/share")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class ShareController {
    private final ShareService shareService;
    private final ShareCommentService shareCommentService;
    private final ShareImageService shareImageService;


    @PostMapping()
    @Operation(summary = "자유게시판 게시글 작성", description = "그림공유게시판에 게시글을 1개 작성합니다.")
    public ResponseEntity<ShareResponse> createShare(@RequestHeader HttpHeaders headers,
                                                     @RequestPart ShareWriteRequest shareWriteRequest,
                                                     @RequestPart(required = false) List<MultipartFile> files) {
        // 유저 아이디 수정
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 32;
        shareWriteRequest.setImageList(files);
        return new ResponseEntity<>(shareService.writeShare(userId, shareWriteRequest), HttpStatus.CREATED);
    }

    @GetMapping("/{shareId}")
    @Operation(summary = "그림공유게시판 게시글 상세 조회", description = "클릭한 그림공유게시판의 게시글을 상세 조회 합니다.")
    public ResponseEntity<ShareDetailResponse> shareDetail(@PathVariable long shareId) {
        return new ResponseEntity<>(shareService.shareDetail(shareId), HttpStatus.OK);
    }

    @DeleteMapping("/{shareId}")
    @Operation(summary = "그림공유게시판 게시글 삭제", description = "선택된 그림공유게시판의 게시글을 1개 삭제합니다.")
    public ResponseEntity<Void> deleteShare(@PathVariable long shareId) {
        shareService.deleteShare(shareId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{shareId}")
    @Operation(summary = "그림공유게시판 게시글 수정", description = "선택된 그림공유게시판의 게시글을 1개 수정합니다.")
    public ResponseEntity<Share> updateShare(@RequestHeader HttpHeaders headers,
                                             @PathVariable long shareId,
                                             @RequestBody ShareUpdateRequest shareUpdateRequest) {
        // 유저 아이디 수정
        long userId = Long.parseLong(headers.get("user_id").get(0));
        return new ResponseEntity<>(shareService.modifyShare(userId, shareUpdateRequest), HttpStatus.OK);
    }
    // 검색
    @GetMapping("/search")
    public Page<ShareListResponse> searchBoards(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String sort,
            Pageable pageable) {
        return shareService.searchShares(keyword, searchType, sort, pageable);
    }
}
