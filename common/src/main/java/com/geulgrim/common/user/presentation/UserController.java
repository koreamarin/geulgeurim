package com.geulgrim.common.user.presentation;

import com.geulgrim.common.user.application.UserService;
import com.geulgrim.common.user.application.dto.request.FcmUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // 클래스 레벨에서 CORS 허용, 프론트 서버에서 보내는 것 허용해놓기 위해서 임시로 해놨습니다
public class UserController {

    private final UserService userService;

    @PostMapping("/fcm")
    @Operation(summary = "fcm 토큰 업데이트", description = "프론트에서 받은 fcm 토큰을 유저정보에 업데이트합니다.")
    public ResponseEntity<?> updateFcmToken(@RequestBody FcmUpdateRequestDto dto) {
        userService.updateUserFcm(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
