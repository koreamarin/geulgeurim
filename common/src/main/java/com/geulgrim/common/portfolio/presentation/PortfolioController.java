package com.geulgrim.common.portfolio.presentation;

import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequest;
import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequestMyFormat;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponse;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetail;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetailMyFormat;
import com.geulgrim.common.portfolio.application.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/common/portfolio")
@RestController
@Slf4j
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/{userId}")
    @Operation(summary = "내 포트폴리오 전체 조회", description = "모든 포트폴리오를 조회합니다.")
    public ResponseEntity<List<PortfolioResponse>> getPortfolios(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("userId") Long userId
    ) {
        List<PortfolioResponse> responses = portfolioService.getPortfolios(userId);
        return ResponseEntity.ok(responses);
    }


    @GetMapping("/guest/{userId}")
    @Operation(summary = "포트폴리오 전체 조회", description = "다른 사람의 포트폴리오를 조회합니다.")
    public ResponseEntity<List<PortfolioResponse>> getOtherPortfolios(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("userId") Long userId
    ) {
        List<PortfolioResponse> responses = portfolioService.getOtherPortfolios(userId);
        return ResponseEntity.ok(responses);
    }


    @GetMapping("/detail/{pofol_id}")
    @Operation(summary = "포트폴리오 상세 조회", description = "글그림 포맷의 포트폴리오를 상세 조회합니다.")
    public ResponseEntity<PortfolioResponseDetail> getPortfolioDetail(
            @PathVariable("pofol_id") Long pofolId
    ) {
        PortfolioResponseDetail detail = portfolioService.getPortfolioDetail(pofolId);
        return ResponseEntity.ok(detail);
    }


    @GetMapping("/detail/user/{pofol_id}")
    @Operation(summary = "포트폴리오 상세 조회", description = "사용자 포맷의 포트폴리오를 상세 조회합니다.")
    public ResponseEntity<PortfolioResponseDetailMyFormat> getPortfolioDetailMyFormat(
            @PathVariable("pofol_id") Long pofolId
    ) {
        PortfolioResponseDetailMyFormat detail = portfolioService.getPortfolioDetailMyFormat(pofolId);
        return ResponseEntity.ok(detail);
    }


    @PostMapping("/{userId}")
    @Operation(summary = "포트폴리오 등록", description = "글그림 포맷의 포트폴리오를 등록합니다.")
    public ResponseEntity<Long> addPortfolio(
            @RequestBody PortfolioRequest portfolioRequest,
            @PathVariable("userId") Long userId
    ) {
        Long portfolioId = portfolioService.addPortfolio(userId, portfolioRequest);
        return ResponseEntity.ok(portfolioId);
    }


    @PostMapping("/user/{userId}")
    @Operation(summary = "포트폴리오 등록", description = "사용자 포맷의 포트폴리오를 등록합니다.")
    public ResponseEntity<Long> addPortfolioMyFormat(
            @RequestBody PortfolioRequestMyFormat portfolioRequest,
            @PathVariable("userId") Long userId
    ) {
        Long portfolioId = portfolioService.addPortfolioMyFormat(userId, portfolioRequest);
        return ResponseEntity.ok(portfolioId);
    }


    @DeleteMapping("/{pofol_id}")
    @Operation(summary = "포트폴리오 삭제", description = "포트폴리오를 삭제합니다.")
    public ResponseEntity<String> deletePortfolio(
            @PathVariable("pofol_id") Long pofol_id
    ) {
        String result = portfolioService.deletePortfolio(pofol_id);
        return ResponseEntity.ok(result);
    }

}
