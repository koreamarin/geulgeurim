package com.geulgrim.common.user.presentation;

import com.geulgrim.common.user.application.UserService;
import com.geulgrim.common.user.application.dto.request.FcmUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/fcm")
    public ResponseEntity<?> updateFcmToken(@RequestBody FcmUpdateRequestDto dto) {
        userService.updateUserFcm(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
