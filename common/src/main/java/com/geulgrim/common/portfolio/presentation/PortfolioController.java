package com.geulgrim.common.portfolio.presentation;

import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequest;
import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequestMyFormat;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponse;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetail;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetailMyFormat;
import com.geulgrim.common.portfolio.application.service.PortfolioService;
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

    // 다른 사람 포트폴리오 조회
    @GetMapping("/guest/{userId}")
    public ResponseEntity<List<PortfolioResponse>> getOtherPortfolios(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("userId") Long userId
    ) {
        List<PortfolioResponse> responses = portfolioService.getOtherPortfolios(userId);
        return ResponseEntity.ok(responses);
    }

    // 내 포트폴리오 상세 조회 (글그림 포맷)
    @GetMapping("/detail/{pofol_id}")
    public ResponseEntity<PortfolioResponseDetail> getPortfolioDetail(
            @PathVariable("pofol_id") Long pofolId
    ) {
        PortfolioResponseDetail detail = portfolioService.getPortfolioDetail(pofolId);
        return ResponseEntity.ok(detail);
    }

    // 내 포트폴리오 상세 조회 (사용자 포맷)
    @GetMapping("/detail/user/{pofol_id}")
    public ResponseEntity<PortfolioResponseDetailMyFormat> getPortfolioDetailMyFormat(
            @PathVariable("pofol_id") Long pofolId
    ) {
        PortfolioResponseDetailMyFormat detail = portfolioService.getPortfolioDetailMyFormat(pofolId);
        return ResponseEntity.ok(detail);
    }


    // 내 포트폴리오 등록 (글그림 포맷)
    @PostMapping("/{userId}")
    public ResponseEntity<Long> addPortfolio(
            @RequestBody PortfolioRequest portfolioRequest,
            @PathVariable("userId") Long userId
    ) {
        Long portfolioId = portfolioService.addPortfolio(userId, portfolioRequest);
        return ResponseEntity.ok(portfolioId);
    }

    // 내 포트폴리오 등록 (사용자 포맷)
    @PostMapping("/user/{userId}")
    public ResponseEntity<Long> addPortfolioMyFormat(
            @RequestBody PortfolioRequestMyFormat portfolioRequest,
            @PathVariable("userId") Long userId
    ) {
        Long portfolioId = portfolioService.addPortfolioMyFormat(userId, portfolioRequest);
        return ResponseEntity.ok(portfolioId);
    }

    // 내 포트폴리오 삭제
    @DeleteMapping("/{pofol_id}")
    public ResponseEntity<String> deletePortfolio(
            @PathVariable("pofol_id") Long pofol_id
    ) {
        String result = portfolioService.deletePortfolio(pofol_id);
        return ResponseEntity.ok(result);
    }




}
