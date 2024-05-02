package com.geulgrim.market.commonserver.piece.presentation;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "common-feign-client", url = "https://k10c108.p.ssafy.io:8081")
public class PieceFeignClient {

}
