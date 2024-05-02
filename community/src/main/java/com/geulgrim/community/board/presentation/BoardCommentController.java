package com.geulgrim.community.board.presentation;

import com.geulgrim.community.board.application.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comment/board")
@Slf4j
public class BoardCommentController {

    private final BoardCommentService boardCommentService;


}
