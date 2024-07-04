package com.geulgrim.auth.security.config;

import com.geulgrim.auth.security.jwt.JWTUtil;
import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.application.service.OAuth2UserService;
import com.geulgrim.auth.user.domain.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.PrintWriter;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final OAuth2UserService oAuth2UserService;
    private final JWTUtil jwtUtil;
    private final AuthenticationConfiguration authenticationConfiguration;

    private AuthRepository authRepository;

    public SecurityConfig(OAuth2UserService oAuth2UserService, JWTUtil jwtUtil, final AuthenticationConfiguration authenticationConfiguration) {
        this.oAuth2UserService = oAuth2UserService;
        this.jwtUtil = jwtUtil;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager () throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();
//        http.authenticationManager(authenticationManager);

        http
            .csrf(config -> config.disable())
            .authorizeHttpRequests(config -> config.anyRequest().permitAll())
            .oauth2Login(oauth2Configurer -> oauth2Configurer
                .loginPage("/api/v1/auth/oauth2/authorization/kakao")
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

//            // 헤더에 토큰 추가
//            response.addHeader("Authorization", "Bearer " + AccessToken);
//            response.addHeader("RefrashAuthoriz ation", "Bearer " + RefrashToken);
//
//            PrintWriter writer = response.getWriter();
//            writer.println(userLoginResponse);
//            writer.flush();
            String encodedNickname = URLEncoder.encode(userLoginResponse.getNickname(), StandardCharsets.UTF_8.name());

            // 요청을 보낸 클라이언트의 url을 가져옴
            String referer = request.getHeader("referer");
            System.out.println(referer);

            if(referer == null) {
                String geul = URLEncoder.encode("글그림", StandardCharsets.UTF_8.name());
                referer = "https://" + geul + ".com/";
            }

            // Redirect to Frontend with Token in URL
            String redirectUrl = referer+"auth/callback?access_token=" + AccessToken + "&refresh_token=" + RefrashToken  + "&user_id=" + userLoginResponse.getUser_id() + "&user_type=" + userLoginResponse.getUserType() + "&nickname=" + encodedNickname + "&profile_url=" + userLoginResponse.getProfile_url();

            System.out.println(redirectUrl);
            response.sendRedirect(redirectUrl);
        });
    }

}
