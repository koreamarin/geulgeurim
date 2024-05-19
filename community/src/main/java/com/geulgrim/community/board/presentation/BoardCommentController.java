package com.geulgrim.community.board.presentation;

import com.geulgrim.community.board.application.dto.request.BoardCommentUpdateRequest;
import com.geulgrim.community.board.application.dto.request.BoardCommentWriteRequest;
import com.geulgrim.community.board.application.dto.request.BoardUpdateRequest;
import com.geulgrim.community.board.application.dto.response.BoardCommentResponse;
import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.application.service.BoardCommentService;
import com.geulgrim.community.board.domain.entity.BoardComment;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community/comment/board")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class BoardCommentController {

    private final BoardCommentService boardCommentService;

    @PostMapping("")
    @Operation(summary = "자유게시판 댓글 작성", description = "선택된 자유게시판의 게시글에 댓글을 작성합니다.")
    public ResponseEntity<List<BoardCommentResponse>> createBoardComment(@RequestHeader HttpHeaders headers,
                                                                         @RequestBody BoardCommentWriteRequest boardCommentWriteRequest) {
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 5;
        return new ResponseEntity<>(boardCommentService.writeComment(userId, boardCommentWriteRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{boardCommentId}")
    @Operation(summary = "자유게시판 댓글 수정", description = "선택된 댓글을 수정합니다.")
    public ResponseEntity<BoardComment> updateBoardComment(@PathVariable Long boardCommentId,
                                                           @RequestBody BoardCommentUpdateRequest boardCommentUpdateRequest) {
        return new ResponseEntity<>(boardCommentService.modifyComment(boardCommentId, boardCommentUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{boardCommentId}")
    @Operation(summary = "자유게시판 댓글 삭제", description = "선택된 댓글을 삭제합니다.")
    public ResponseEntity<Void> deleteBoardComment(@PathVariable Long boardCommentId) {
        boardCommentService.deleteComment(boardCommentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/mycomment")
    public Page<BoardCommentResponse> myComments(@RequestHeader HttpHeaders headers,
                                               @RequestParam(required = false) String keyword,
                                               @RequestParam(required = false) String searchType,
                                               @RequestParam(required = false) String sort,
                                               Pageable pageable) {
        long userId = Long.parseLong(headers.get("user_id").get(0));
//        long userId = 5;
        return boardCommentService.myComments(userId, keyword, sort, pageable);
    }

}
