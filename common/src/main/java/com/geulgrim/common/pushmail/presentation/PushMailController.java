package com.geulgrim.common.pushmail.presentation;

import com.geulgrim.common.pushmail.application.PushMailService;
import com.geulgrim.common.pushmail.application.request.PushMailCreateDto;
import com.geulgrim.common.pushmail.application.response.PushMailResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/push")
public class PushMailController {

    private final PushMailService pushMailService;

    @PostMapping("/create")
    @Operation(summary = "푸시메일 생성", description = "푸시 메일을 생성합니다.")
    public ResponseEntity<PushMailResponseDto> create(@RequestBody PushMailCreateDto dto) {
        return new ResponseEntity(pushMailService.create(dto), HttpStatus.CREATED);
    }

}
