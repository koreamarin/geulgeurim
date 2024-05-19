package com.geulgrim.community.board.presentation;

import com.geulgrim.community.board.application.service.BoardService;
import com.geulgrim.community.crew.application.service.CrewService;
import com.geulgrim.community.share.application.service.ShareService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class CommunityController {

    private final CrewService crewService;
    private final BoardService boardService;
    private final ShareService shareService;

    @GetMapping("")
    @Operation(summary = "커뮤니티 메인 화면",
            description = "커뮤니티 메인 화면에 자유게시판 인기글 5개, 최신글 5개, 그림평가 게시판 최신글 6개, 크루모집 최신글 6개를 조회합니다.")
    public ResponseEntity<Map<String, List<?>>> communityMain() {
        Map<String, List<?>> map = new HashMap<>();
        // 인기글
        map.put("popBoard", boardService.mainBoardPopularList());
        // 최신글
        map.put("newBoard", boardService.mainBoardNewList());
        // 그림평가 최신
        map.put("newShare", shareService.mainShareNewList());
        // 크루모집 최신
        map.put("newCrew", crewService.findRecentCrewList());

        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
