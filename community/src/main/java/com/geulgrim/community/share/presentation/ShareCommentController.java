package com.geulgrim.community.share.presentation;

import com.geulgrim.community.share.application.dto.request.ShareCommentUpdateRequest;
import com.geulgrim.community.share.application.dto.request.ShareCommentWriteRequest;
import com.geulgrim.community.share.application.dto.response.ShareCommentResponse;
import com.geulgrim.community.share.application.service.ShareCommentService;
import com.geulgrim.community.share.domain.entity.ShareComment;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community/comment/share")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class ShareCommentController {
    private final ShareCommentService shareCommentService;

    @PostMapping("")
    @Operation(summary = "자유게시판 댓글 작성", description = "선택된 자유게시판의 게시글에 댓글을 작성합니다.")
    public ResponseEntity<List<ShareCommentResponse>> createShareComment(@RequestHeader HttpHeaders headers,
                                                                         @RequestBody ShareCommentWriteRequest shareCommentWriteRequest) {

        long userId = Long.parseLong(headers.get("user_id").get(0));
        return new ResponseEntity<>(shareCommentService.writeComment(userId, shareCommentWriteRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{shareCommentId}")
    @Operation(summary = "자유게시판 댓글 수정", description = "선택된 댓글을 수정합니다.")
    public ResponseEntity<ShareComment> updateShareComment(@PathVariable Long shareCommentId,
                                                           @RequestBody ShareCommentUpdateRequest shareCommentUpdateRequest) {
        return new ResponseEntity<>(shareCommentService.modifyComment(shareCommentId, shareCommentUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{shareCommentId}")
    @Operation(summary = "자유게시판 댓글 삭제", description = "선택된 댓글을 삭제합니다.")
    public ResponseEntity<Void> deleteShareComment(@PathVariable Long shareCommentId) {
        shareCommentService.deleteComment(shareCommentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
