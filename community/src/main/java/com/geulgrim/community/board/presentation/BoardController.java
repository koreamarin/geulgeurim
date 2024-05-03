package com.geulgrim.community.board.presentation;

import com.geulgrim.community.board.application.dto.request.BoardUpdateRequest;
import com.geulgrim.community.board.application.dto.request.BoardWriteRequest;
import com.geulgrim.community.board.application.dto.response.BoardDetailResponse;
import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.application.service.BoardCommentService;
import com.geulgrim.community.board.application.service.BoardImageService;
import com.geulgrim.community.board.application.service.BoardService;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardComment;
import com.geulgrim.community.global.file.entity.FileUrl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
@Slf4j
public class BoardController {
    private final BoardService boardService;
    private final BoardCommentService boardCommentService;
    private final BoardImageService boardImageService;

    @GetMapping()
    @Operation(summary = "자유게시판 게시글 전체 조회", description = "자유게시판의 모든 게시글을 조회합니다.")
    public ResponseEntity<List<BoardListResponse>> getBoard() {
        return new ResponseEntity<>(boardService.boardList(), HttpStatus.OK);
    }

    @PostMapping()
    @Operation(summary = "자유게시판 게시글 작성", description = "자유게시판에 게시글을 1개 작성합니다.")
    public ResponseEntity<Board> createBoard(@RequestPart BoardWriteRequest boardWriteRequest,
                                             @RequestPart(required = false) List<MultipartFile> files) {
        // 유저 아이디 수정
        long userId = 1;
        boardWriteRequest.setImageList(files);
        return new ResponseEntity<>(boardService.writeBoard(userId, boardWriteRequest), HttpStatus.CREATED);
    }

    @GetMapping("/{boardId}")
    @Operation(summary = "자유게시판 게시글 상세 조회", description = "클릭한 자유게시판의 게시글을 상세 조회 합니다.")
    public ResponseEntity<BoardDetailResponse> boardDetail(@PathVariable long boardId) {
        return new ResponseEntity<>(boardService.boardDetail(boardId), HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    @Operation(summary = "자유게시판 게시글 삭제", description = "선택된 자유게시판의 게시글을 1개 삭제합니다.")
    public ResponseEntity<Void> deleteBoard(@PathVariable long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{boardId}")
    @Operation(summary = "자유게시판 게시글 수정", description = "선택된 자유게시판의 게시글을 1개 수정합니다.")
    public ResponseEntity<Board> updateBoard(@PathVariable long boardId, @RequestBody BoardUpdateRequest boardUpdateRequest) {
        // 유저 아이디 수정
        long userId = 1;
        return new ResponseEntity<>(boardService.modifyBoard(userId, boardUpdateRequest), HttpStatus.OK);
    }
    // 검색
}
