package com.geulgrim.auth.user.presentation;

import com.geulgrim.auth.security.jwt.JWTUtil;
import com.geulgrim.auth.user.application.dto.request.EnterUserLoginRequest;
import com.geulgrim.auth.user.application.dto.request.EnterUserSignUpRequest;
import com.geulgrim.auth.user.application.dto.request.FcmUpdateRequestDto;
import com.geulgrim.auth.user.application.dto.response.*;
import com.geulgrim.auth.user.application.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    private final JWTUtil jwtUtil;

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
    public ResponseEntity<UserLoginResponse> EnterUserLogin(@RequestBody EnterUserLoginRequest enterUserLoginRequest, @RequestHeader HttpHeaders headers) {

        UserLoginResponse userLoginResponse = userService.EnterUserLogin(enterUserLoginRequest);

        // 토큰발급
        String AccessToken = jwtUtil.createAccessToken(userLoginResponse.getUser_id(), userLoginResponse.getUserType());
        String RefrashToken = jwtUtil.createRefreshToken(userLoginResponse.getUser_id(), userLoginResponse.getUserType());

        HttpHeaders ResponseHeaders = new HttpHeaders();
        ResponseHeaders.add("Authorization", "Bearer " + AccessToken);
        ResponseHeaders.add("RefrashAuthorization", "Bearer " + RefrashToken);

        return new ResponseEntity<>(userLoginResponse, ResponseHeaders, HttpStatus.OK);
    }

    // 개인 유저 전체 조회
    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        GetUsersResponses getUsersResponses = userService.getUsers();
        return new ResponseEntity<>(getUsersResponses, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader HttpHeaders headers) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        GetUserResponse getUserResponse = userService.getUser(userId);
        return new ResponseEntity<>(getUserResponse, HttpStatus.OK);
    }

    @GetMapping("/userinfo/{id}")
    public ResponseEntity<UserInfoResponse> getUserInfo(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserInfo(id), HttpStatus.OK);
    }

    @GetMapping("/enteruser")
    public ResponseEntity<?> getEnterUser(@RequestHeader HttpHeaders headers) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));

        GetEnterUserResponse getEnterUserResponse = userService.getEnterUser(userId);
        return new ResponseEntity<>(getEnterUserResponse, HttpStatus.OK);
    }

    // 알람 수신자 정보 조회
    @GetMapping("/rcvuser/{id}")
    public ResponseEntity<?> getRcvUser(@RequestHeader HttpHeaders headers, @PathVariable("id") Long rcvUserId) {
        GetUserResponse getUserResponse = userService.getUser(rcvUserId);
        return new ResponseEntity<>(getUserResponse, HttpStatus.OK);
    }

    @PostMapping("/fcm")
//    @Operation(summary = "fcm 토큰 업데이트", description = "프론트에서 받은 fcm 토큰을 유저정보에 업데이트합니다.")
    public ResponseEntity<?> updateFcmToken(@RequestBody FcmUpdateRequestDto dto,
                                            @RequestHeader HttpHeaders headers) {
        Long userId = Long.parseLong(headers.get("user_id").get(0));
        userService.updateUserFcm(dto, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}


