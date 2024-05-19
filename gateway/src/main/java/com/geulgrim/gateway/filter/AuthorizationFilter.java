package com.geulgrim.gateway.filter;

import com.geulgrim.gateway.dto.UserInfoResponseDto;
import com.geulgrim.gateway.exception.UnAuthorizedException;
import com.geulgrim.gateway.util.AuthorizationUtil;
import com.geulgrim.gateway.util.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthorizationFilter extends AbstractGatewayFilterFactory<AuthorizationFilter.Config> {

    public AuthorizationFilter(JWTUtil jwtUtil, AuthorizationUtil authorizationUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
        this.authorizationUtil = authorizationUtil;
    }

    private final JWTUtil jwtUtil;
    private final AuthorizationUtil authorizationUtil;

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            String uri = exchange.getRequest().getURI().getPath();
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            log.info("headers : {}", request.getHeaders());
            response.getHeaders().remove("Vary");

            if(uri.startsWith("/api/v1/recruit/jobdetail")){
                UserInfoResponseDto dto = authorizationUtil.NonAuthorizeButHeaderCheck(request);
                if (dto != null) {
                    request.mutate().header("user_id", String.valueOf(dto.getUserId()));
                    request.mutate().header("user_type", dto.getUserType());
                }
                return chain.filter(exchange);
            }

            if(!uri.startsWith("/api/v1/recruit/joblist") && !uri.startsWith("/api/v1/recruit/jobdetail")){
                UserInfoResponseDto dto = authorizationUtil.Authorize(request);
                if(dto != null && dto.getUserId() != null){
                    request.mutate().header("user_id", String.valueOf(dto.getUserId()));
                    request.mutate().header("user_type", dto.getUserType());
                }else{throw new UnAuthorizedException();}
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {}
}
