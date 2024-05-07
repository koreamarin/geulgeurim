package com.geulgrim.auth.security.config;

import com.geulgrim.auth.security.jwt.JWTUtil;
import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.application.service.OAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Map;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final OAuth2UserService oAuth2UserService;
    private final JWTUtil jwtUtil;

    public SecurityConfig(OAuth2UserService oAuth2UserService, JWTUtil jwtUtil) {
        this.oAuth2UserService = oAuth2UserService;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(config -> config.disable())
            .authorizeHttpRequests(config -> config.anyRequest().permitAll())
//            .defaultSuccessUrl("/home")
            .oauth2Login(oauth2Configurer -> oauth2Configurer
                .loginPage("/login")
                .successHandler(successHandler())
                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                    .userService(oAuth2UserService)));

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return ((request, response, authentication) -> {

            DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

            Map<String, Object> properties = defaultOAuth2User.getAttributes();
            Map<String, Object> kakao_account = (Map<String, Object>) properties.get("kakao_account");
            UserLoginResponse userLoginResponse = (UserLoginResponse) kakao_account.get("userLoginResponse");

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding(StandardCharsets.UTF_8.name());

            // 토큰발급
            String AccessToken = jwtUtil.createAccessToken(userLoginResponse.getUser_id(), userLoginResponse.getUserType());
            String RefrashToken = jwtUtil.createRefreshToken(userLoginResponse.getUser_id(), userLoginResponse.getUserType());

            // 헤더에 토큰 추가
            response.addHeader("Authorization", "Bearer " + AccessToken);
            response.addHeader("RefrashAuthorization", "Bearer " + RefrashToken);
//            response.addHeader("user_id", String.valueOf(userLoginResponse.getUser_id()));        // Body에 있으므로 필요없음
//            response.addHeader("user_type", String.valueOf(userLoginResponse.getUserType()));     // Body에 있으므로 필요없음

            PrintWriter writer = response.getWriter();
            writer.println(userLoginResponse);
            writer.flush();
        });
    }
}
