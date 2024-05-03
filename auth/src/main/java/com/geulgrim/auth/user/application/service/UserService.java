package com.geulgrim.auth.user.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geulgrim.auth.user.application.dto.request.OAuthTokenRequest;
import com.geulgrim.auth.user.application.dto.request.OAuthUserInfoRequest;
import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import com.geulgrim.auth.user.domain.entity.User;
import com.geulgrim.auth.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserLoginResponse getUser(String AuthorizationCode) {
        // POST 방식으로 key=value 데이터를 요청 (카카오쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate. http 요청을 편하게 할 수 있다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "5954264b0e11490b4e18b73f5aa20f4a");
        params.add("redirect_uri", "http://localhost:8080/api/v1/user/oauth2/code/kakao");
        params.add("code", AuthorizationCode);
        params.add("client_secret", "a7WlWs0PacouOVzilHEUSufzWQv3C0Vt");


        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)가 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        ObjectMapper objectMapper = new ObjectMapper();
        OAuthTokenRequest oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthTokenRequest.class);

        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("카카오 엑세스 토큰 : " + oAuthToken.getAccess_token());

        // 사용자 정보 받기
        RestTemplate rt2 = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + oAuthToken.getAccess_token());
        headers2.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest2 = new HttpEntity<>(params, headers2);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest2, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        ObjectMapper objectMapper2 = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        OAuthUserInfoRequest oAuthUserInfoRequest = null;
        try {
            oAuthUserInfoRequest = objectMapper2.readValue(response2.getBody(), OAuthUserInfoRequest.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        
        // 카카오에서 받은 정보중에서 이메일만 추출
        String email = oAuthUserInfoRequest.getKakao_account().getEmail();
        
        // 이메일로 DB에서 회원정보가 있는지 확인
        User user = userRepository.findByEmail(email);

        if (user == null) { // 만약 없다면 user 정보로 회원가입 시킴
            user = User.builder()
                    .email(email)
                    .name(oAuthUserInfoRequest.getKakao_account().getName())
                    .nickname(oAuthUserInfoRequest.getProperties().getNickname())
                    .userType(UserType.INDIVIDUAL)
                    .phone_num(oAuthUserInfoRequest.getKakao_account().getPhone_number())
                    .build();
            
            // 프로필 있으면 프로필도 넣음
            if (oAuthUserInfoRequest.getKakao_account().getProfile().getThumbnail_image_url()!=null) {
                user.setFile_url(oAuthUserInfoRequest.getKakao_account().getProfile().getThumbnail_image_url());
            }
            // 생년월일 있으면 생년월일도 넣음
            if (oAuthUserInfoRequest.getKakao_account().getBirthday() != null
                    && oAuthUserInfoRequest.getKakao_account().getBirthyear() != null) {
                user.setBirthday(oAuthUserInfoRequest.getKakao_account().getBirthyear()+oAuthUserInfoRequest.getKakao_account().getBirthday());
            }
            userRepository.save(user);
        }
        
        // USER정보 RESPONSE용 DTO에 값 넣기
        UserLoginResponse userLoginResponse = UserLoginResponse.builder()
                .id(user.getUser_id())
                .nickname(user.getNickname())
                .userType(user.getUserType())
                .profile_url(user.getFile_url())
                .build();

        return userLoginResponse;
    }

}
