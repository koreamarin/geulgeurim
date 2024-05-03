package com.geulgrim.market.commonserver.piece.presentation;

import com.geulgrim.market.commonserver.piece.application.response.PieceResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "common-feign-client", url = "https://k10c108.p.ssafy.io:8081")
public interface PieceFeignClient {

    @GetMapping("/api/v1/piece/{id}")
    public PieceResponseDto findById( @PathVariable("id") Long id);

}
