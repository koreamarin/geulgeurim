package com.geulgrim.gateway.util;

import com.geulgrim.gateway.dto.UserInfoResponseDto;
import com.geulgrim.gateway.exception.UnAuthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthorizationUtil {

    private final JWTUtil jwtUtil;

    public AuthorizationUtil(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public UserInfoResponseDto Authorize(ServerHttpRequest request) {

        String header = (String) request.getHeaders().getFirst("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new UnAuthorizedException();
        } else {
            String token = header.replace("Bearer ","");
            UserInfoResponseDto dto = jwtUtil.getUserInfo(token);
            log.info("user_id {}",dto.getUserId());
            log.info("user_type {}",dto.getUserType());
            return dto;
        }
    }

    public UserInfoResponseDto NonAuthorizeButHeaderCheck(ServerHttpRequest request) {
        String header = (String) request.getHeaders().getFirst("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        } else{
            String token = header.replace("Bearer ","");
            return jwtUtil.getUserInfo(token);
        }
    }

}
