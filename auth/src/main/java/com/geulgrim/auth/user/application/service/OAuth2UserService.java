package com.geulgrim.auth.user.application.service;

import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import com.geulgrim.auth.user.domain.entity.User;
import com.geulgrim.auth.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override       // loadUser가 실행될 시점엔 이미 AccessToken이 발급되어 있다
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);        // AccessToken으로 User정보를 조회하는 메서드

        // Role generate
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_ADMIN");

        // nameAttributeKey
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        // DB 저장로직이 필요하면 추가
        Map<String, Object> properties = oAuth2User.getAttributes();
        Map<String, Object> kakao_account = (Map<String, Object>) properties.get("kakao_account");

        // 카카오에서 받은 정보중에서 이메일만 추출
        String email = (String) kakao_account.get("email");
        String thumbnail_image_url = (String) ((Map<String, Object>) kakao_account.get("profile")).get("thumbnail_image_url");
        String nickname = (String) ((Map<String, Object>) kakao_account.get("profile")).get("nickname");

        // 이메일로 DB에서 회원정보가 있는지 확인
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) { // 만약 없다면 user 정보로 회원가입 시킴
            user = User.builder()
                    .email(email)
                    .nickname(nickname)
                    .userType(UserType.INDIVIDUAL)
                    .build();

            // 프로필 있으면 프로필도 넣음
            if (thumbnail_image_url!=null) {
                user.setFile_url(thumbnail_image_url);
            }
            userRepository.save(user);
        }

        // USER정보 RESPONSE용 DTO에 값 넣기
        UserLoginResponse userLoginResponse = UserLoginResponse.builder()
                .user_id(user.getUser_id())
                .nickname(user.getNickname())
                .profile_url(user.getFile_url())
                .userType(user.getUserType())
                .build();

        kakao_account.put("userLoginResponse", userLoginResponse);

        return new DefaultOAuth2User(authorities, oAuth2User.getAttributes(), userNameAttributeName);
    }
}
