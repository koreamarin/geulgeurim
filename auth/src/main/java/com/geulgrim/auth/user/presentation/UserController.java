package com.geulgrim.auth.user.presentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geulgrim.auth.user.application.dto.request.OAuthTokenRequest;
import com.geulgrim.auth.user.application.dto.request.OAuthUserInfoRequest;
import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.application.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    
    private final UserService userService;

//    @GetMapping
//    public ResponseEntity<String> test() {
//        return new ResponseEntity<>("ㅎㅇ", HttpStatus.OK);
//    }

    @GetMapping("/oauth2/code/kakao")
    public ResponseEntity<UserLoginResponse> kakaoCallback(String code) {      // code는 Authorization code 이다.

        UserLoginResponse userLoginResponse = userService.getUser(code);

        return new ResponseEntity<>(userLoginResponse, HttpStatus.OK);
    }
}
