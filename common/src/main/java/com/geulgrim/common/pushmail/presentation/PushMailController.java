package com.geulgrim.common.pushmail.presentation;

import com.geulgrim.common.pushmail.application.PushMailService;
import com.geulgrim.common.pushmail.application.request.PushMailCreateDto;
import com.geulgrim.common.pushmail.application.response.PushMailResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/push")
public class PushMailController {

    private final PushMailService pushMailService;

    @PostMapping("/create")
    public ResponseEntity<PushMailResponseDto> create(PushMailCreateDto dto) {
        return new ResponseEntity(pushMailService.create(dto), HttpStatus.CREATED);
    }

}
