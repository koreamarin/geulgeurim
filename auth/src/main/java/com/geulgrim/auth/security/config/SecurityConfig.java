package com.geulgrim.auth.security.config;

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

    public SecurityConfig(OAuth2UserService oAuth2UserService) {
        this.oAuth2UserService = oAuth2UserService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(config -> config.disable())
            .authorizeHttpRequests(config -> config.anyRequest().permitAll());
//            .oauth2Login(oauth2Configurer -> oauth2Configurer
//                .loginPage("/login")
//                .successHandler(successHandler())
//                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
//                    .userService(oAuth2UserService)));

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return ((request, response, authentication) -> {
//            DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

//            Map<String, Object> properties = defaultOAuth2User.getAttributes();
//            Map<String, Object> kakao_account = (Map<String, Object>) properties.get("kakao_account");

//            String id = defaultOAuth2User.getAttributes().get("id").toString();
//            String connected_at = defaultOAuth2User.getAttributes().get("connected_at").toString();
//            String thumbnail_image_url = (String) ((Map<String, Object>) kakao_account.get("profile")).get("thumbnail_image_url");
//            String nickname = (String) ((Map<String, Object>) kakao_account.get("profile")).get("nickname");
//            String name = (String) kakao_account.get("name");
//            String email = (String) kakao_account.get("email");
//            String phone_number = (String) kakao_account.get("phone_number");
//            String birthyear = (String) kakao_account.get("birthyear");
//            String birthday = (String) kakao_account.get("birthday");
//
//            String body = """
//                    {
//                        "id":"%s",
//                        "connected_at":"%s",
//                        "thumbnail_image_url":"%s",
//                        "nickname":"%s",
//                        "name":"%s",
//                        "email":"%s",
//                        "phone_number":"%s",
//                        "birthyear":"%s",
//                        "birthday":"%s"
//                    }
//                    """.formatted(id, connected_at, thumbnail_image_url, nickname, name, email, phone_number, birthyear, birthday);

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding(StandardCharsets.UTF_8.name());

//            PrintWriter writer = response.getWriter();
//            writer.println(body);
//            writer.flush();
        });
    }
}
