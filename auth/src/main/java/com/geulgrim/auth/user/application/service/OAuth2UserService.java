package com.geulgrim.auth.user.application.service;

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
public class OAuth2UserService extends DefaultOAuth2UserService {
    @Override       // loadUser가 실행될 시점엔 이미 AccessToken이 발급되어 있다
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);        // AccessToken으로 User정보를 조회하는 메서드
        System.out.println(2);
//        Map<String, Object> properties = oAuth2User.getAttributes();
//        Map<String, Object> kakao_account = (Map<String, Object>) properties.get("kakao_account");
//
//        String id = oAuth2User.getAttributes().get("id").toString();
//        String connected_at = oAuth2User.getAttributes().get("connected_at").toString();
//        String thumbnail_image_url = (String) ((Map<String, Object>) kakao_account.get("profile")).get("thumbnail_image_url");
//        String nickname = (String) ((Map<String, Object>) kakao_account.get("profile")).get("nickname");
//        String name = (String) kakao_account.get("name");
//        String email = (String) kakao_account.get("email");
//        String phone_number = (String) kakao_account.get("phone_number");
//        String birthyear = (String) kakao_account.get("birthyear");
//        String birthday = (String) kakao_account.get("birthday");

        // Role generate
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_ADMIN");

        // nameAttributeKey
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        // DB 저장로직이 필요하면 추가

        return new DefaultOAuth2User(authorities, oAuth2User.getAttributes(), userNameAttributeName);
    }
}
