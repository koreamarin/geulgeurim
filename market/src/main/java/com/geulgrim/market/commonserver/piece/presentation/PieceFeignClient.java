package com.geulgrim.market.commonserver.piece.presentation;

import com.geulgrim.market.commonserver.piece.application.response.PieceResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "eureka-client-common", url = "http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8081")
public interface PieceFeignClient {


    @GetMapping("/api/v1/common/piece/{id}")
    public PieceResponseDto findPieceByIdFromCommon(@PathVariable("id") Long pieceId);
}
