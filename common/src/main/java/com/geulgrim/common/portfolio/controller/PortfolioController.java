package com.geulgrim.common.portfolio.controller;

import com.geulgrim.common.portfolio.dto.PortfolioResponse;
import com.geulgrim.common.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/portfolio")
@RestController
@Slf4j
public class PortfolioController {

    private final PortfolioService portfolioService;

    // 포트폴리오 전체 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<PortfolioResponse>> getPortfolios(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("userId") Long userId
    ) {
        List<PortfolioResponse> responses = portfolioService.getPortfolios(userId);
        return ResponseEntity.ok(responses);
    }


}
