package com.geulgrim.market.market.presentation;

import com.geulgrim.market.market.application.MarketService;
import com.geulgrim.market.market.application.dto.request.MarketCreateRequestDto;
import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/market")
public class MarketController {

    private final MarketService marketService;

    @PostMapping("/create")
    public ResponseEntity<Long> create (@RequestPart(value = "files", required = false) MultipartFile image, @RequestPart MarketCreateRequestDto dto) throws IOException {

        return new ResponseEntity<>(marketService.create(image, dto), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update (@RequestPart(value = "files", required = false) MultipartFile image, @RequestPart MarketUpdateRequestDto dto) throws IOException {
        return new ResponseEntity<>(marketService.update(image, dto), HttpStatus.OK);
    }

}
