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
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RequestMapping("/api/v1/common/portfolio")
@CrossOrigin(origins = {"http://localhost:3000", "https://글그림.com", "https://xn--2i0bpa721g.com/"})
@RestController
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    @Operation(summary = "내 포트폴리오 전체 조회", description = "모든 포트폴리오를 조회합니다.")
    public ResponseEntity<List<PortfolioResponse>> getPortfolios(
            @RequestHeader HttpHeaders headers
    ) {
        Long userId = Long.parseLong(Objects.requireNonNull(headers.get("user_id")).get(0));
        List<PortfolioResponse> responses = portfolioService.getPortfolios(userId);
        return ResponseEntity.ok(responses);
    }


    @GetMapping("/guest/{user_id}")
    @Operation(summary = "포트폴리오 전체 조회", description = "다른 사람의 포트폴리오를 조회합니다.")
    public ResponseEntity<List<PortfolioResponse>> getOtherPortfolios(
            @PathVariable("user_id") Long userId

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


    @PostMapping
    @Operation(summary = "포트폴리오 등록", description = "글그림 포맷의 포트폴리오를 등록합니다.")
    public ResponseEntity<Long> addPortfolio(
            @RequestPart PortfolioRequest portfolioRequest,
            @RequestPart ArrayList<MultipartFile> files,
            @RequestHeader HttpHeaders headers
    ) {
        Long userId =  Long.parseLong(headers.get("user_id").get(0));
        portfolioRequest.setFiles(files);
        Long portfolioId = portfolioService.addPortfolio(userId, portfolioRequest);
        return ResponseEntity.ok(portfolioId);
    }


    @PostMapping("/user")
    @Operation(summary = "포트폴리오 등록", description = "사용자 포맷의 포트폴리오를 등록합니다.")
    public ResponseEntity<Long> addPortfolioMyFormat(
            @RequestPart PortfolioRequestMyFormat portfolioRequest,
            @RequestPart List<MultipartFile> files,
            @RequestHeader HttpHeaders headers
    ) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        portfolioRequest.setFileList(files);
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
