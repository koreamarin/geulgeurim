package com.geulgrim.auth.security.jwt;

import com.geulgrim.auth.user.domain.repository.AuthRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import java.io.IOException;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private AuthRepository authRepository;
    private JWTUtil jwtUtil;
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, AuthRepository authRepository, JWTUtil jwtUtil) {
        super(authenticationManager);
        this.authRepository = authRepository;
        this.jwtUtil = jwtUtil;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String jwtHeader = request.getHeader("Authorization");
        log.info("current token : " + jwtHeader);
        // JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        String jwtToken = request.getHeader("Authorization").replace("Bearer ","");

        response.addHeader("user_id", String.valueOf(jwtUtil.getUserId(jwtToken)));
        response.addHeader("user_type", jwtUtil.getUserType(jwtToken));

        chain.doFilter(request, response);
    }
}
