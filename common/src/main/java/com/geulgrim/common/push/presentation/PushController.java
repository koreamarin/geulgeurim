package com.geulgrim.common.push.presentation;

import com.geulgrim.common.push.application.PushService;
import com.geulgrim.common.push.application.dto.request.PushCreateRequestDto;
import com.geulgrim.common.push.application.dto.response.PushCreateResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/push")
@Slf4j
public class PushController {

    private final PushService pushService;

    @PostMapping("/create")
    @Operation(summary = "푸시생성", description = "메일푸시와 웹푸시를 생성합니다.")
    public ResponseEntity<PushCreateResponseDto> create(@RequestBody PushCreateRequestDto dto) {
        log.info("push - 푸시 생성 요청 : {}", dto);
        return new ResponseEntity<>(pushService.create(dto), HttpStatus.CREATED);
    }

}
