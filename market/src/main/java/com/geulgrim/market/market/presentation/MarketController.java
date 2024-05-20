package com.geulgrim.market.market.presentation;

import com.geulgrim.market.market.application.MarketService;
import com.geulgrim.market.market.application.dto.request.MarketCreateRequestDto;
import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
import com.geulgrim.market.market.application.dto.response.ETHResponseDto;
import com.geulgrim.market.market.application.dto.response.MarketDetailResponseDto;
import com.geulgrim.market.market.application.dto.response.MarketResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/market")
public class MarketController {

    private static final Logger log = LoggerFactory.getLogger(MarketController.class);
    private final MarketService marketService;

    @PostMapping
    @Operation(summary = "게시글 생성", description = "마켓에 게시글을 생성합니다")
    public ResponseEntity<Long> create(@RequestPart(value = "files", required = false) MultipartFile image, @RequestPart MarketCreateRequestDto dto) throws IOException {

        return new ResponseEntity<>(marketService.create(image, dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "게시글 수정", description = "마켓 게시글을 수정합니다")
    public ResponseEntity<MarketResponseDto> update(@PathVariable Long id, @RequestPart(value = "files", required = false) MultipartFile image, @RequestPart MarketUpdateRequestDto dto) throws IOException {
        return new ResponseEntity<>(marketService.update(id, image, dto), HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "게시글 리스트 조회, 필터 및 정렬", description = "게시글 리스트를 조회합니다. 제목, 내용으로 필터링 및 조회수로 내림차순 정렬 가능")
    public ResponseEntity<List<MarketResponseDto>> Markets(@RequestParam(required = false) String type,
                                                           @RequestParam(required = false) String keyword,
                                                           @RequestParam(required = false) boolean isOrderViewCount) {
        return new ResponseEntity<>(marketService.searchAndOrderMarkets(type, keyword, isOrderViewCount), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "게시글 상세 조회", description = "게시글을 상세 조회합니다. 작품을 구매할 수 있는 페이지입니다")
    public ResponseEntity<MarketDetailResponseDto> detail (@PathVariable Long id){
        return new ResponseEntity<>(marketService.detail(id), HttpStatus.OK);
    }

    @GetMapping("/info")
    @Operation(summary = "이더리움 정보 조회", description = "API를 이용해 현재 이더리움 정보를 조회합니다")
    public ResponseEntity<ETHResponseDto> info () {
        return new ResponseEntity<>(marketService.getETHinfo(), HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity test(@RequestHeader HttpHeaders header) {
        log.info("@@@@@@@@@@@ in test controller @@@@@@@@@@@@");

        String userId = header.getFirst("user_id");
        String userType = header.getFirst("user_type");

        log.info("userId : {}",userId);
        log.info("userType : {}",userType);

        return new ResponseEntity(HttpStatus.OK);
    }
}
