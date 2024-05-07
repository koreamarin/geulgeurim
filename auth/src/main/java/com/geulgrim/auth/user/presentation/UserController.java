package com.geulgrim.auth.user.presentation;

import com.geulgrim.auth.user.application.dto.request.EnterUserLoginRequest;
import com.geulgrim.auth.user.application.dto.request.EnterUserSignUpRequest;
import com.geulgrim.auth.user.application.dto.response.EnterUserSignUpResponse;
import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.application.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/auth/")
public class UserController {
    
    private final UserService userService;


    // 기업 회원가입
    @PostMapping("/signup")
    public ResponseEntity<EnterUserSignUpResponse> EnterUserSingUp(
            @RequestPart EnterUserSignUpRequest enterUserSignUpRequest,
            @RequestPart MultipartFile image_file
    ) {
        EnterUserSignUpResponse result = userService.enterUserSignup(enterUserSignUpRequest, image_file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 이메일 중복확인
    @GetMapping("/emailcheck")
    public ResponseEntity<Map<String, String>> EnterUserEmailCheck(@RequestParam String email) {
        Map<String, String> message = new HashMap<>();
        String status = userService.UserEmailCheck(email);
        message.put("message", status);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 기업 사업자 가입여부 확인
    @GetMapping("/businesscheck")
    public ResponseEntity<Map<String, String>> EnterUserBusinessCheck(@RequestParam String code) {
        Map<String, String> message = new HashMap<>();
        String status = userService.BusinessCheck(code);
        message.put("message", status);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 기업 회원 로그인
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> EnterUserLogin(@RequestBody EnterUserLoginRequest enterUserLoginRequest) {

        System.out.println(enterUserLoginRequest);

        UserLoginResponse userLoginResponse = userService.EnterUserLogin(enterUserLoginRequest);



        return new ResponseEntity<UserLoginResponse>(userLoginResponse, HttpStatus.OK);
    }

}
