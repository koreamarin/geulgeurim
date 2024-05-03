package com.geulgrim.community.board.presentation;

import com.geulgrim.community.board.application.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/community")
@Slf4j
public class CommunityController {

    private BoardService boardService;


    @GetMapping("/")
    @Operation(summary = "커뮤니티 메인 화면",
            description = "커뮤니티 메인 화면에 자유게시판 인기글 5개, 최신글 5개, 그림평가 게시판 최신글 5개, 크루모집 최신글 5개를 조회합니다.")
    public ResponseEntity<?> communityMain() {
        Map<String, List<?>> map = new HashMap<>();
        // 인기글
        map.put("popularBoard", boardService.mainBoardPopularList());
        // 최신글
        map.put("newBoard", boardService.mainBoardNewList());
        // 그림평가 최신

        // 크루모집 최신

        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
