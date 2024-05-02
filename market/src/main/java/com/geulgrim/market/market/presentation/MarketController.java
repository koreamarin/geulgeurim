package com.geulgrim.market.market.presentation;

import com.geulgrim.market.market.application.MarketService;
import com.geulgrim.market.market.application.dto.request.MarketCreateRequestDto;
import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/market")
public class MarketController {

    private final MarketService marketService;

    @PostMapping("/create")
    public ResponseEntity<Long> create (@RequestBody MarketCreateRequestDto dto) {

        return new ResponseEntity<>(marketService.create(dto), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update (@RequestBody MarketUpdateRequestDto dto) {
        return new ResponseEntity<>(marketService.update(dto), HttpStatus.OK);
    }

}
