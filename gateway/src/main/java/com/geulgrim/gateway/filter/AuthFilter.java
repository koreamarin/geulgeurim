package com.geulgrim.gateway.filter;

import com.geulgrim.gateway.dto.UserInfoResponseDto;
import com.geulgrim.gateway.exception.UnAuthorizedException;
import com.geulgrim.gateway.util.AuthorizationUtil;
import com.geulgrim.gateway.util.JWTUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthFilter  extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    public AuthFilter(JWTUtil jwtUtil, AuthorizationUtil authorizationUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
        this.authorizationUtil = authorizationUtil;
    }

    private final JWTUtil jwtUtil;
    private final AuthorizationUtil authorizationUtil;

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String uri = exchange.getRequest().getURI().getPath();
            ServerHttpRequest request = exchange.getRequest();

            if (uri.startsWith("/api/v1/auth/users")){
                exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                return exchange.getResponse().setComplete();
            }else if(uri.startsWith("/api/v1/auth/enteruser") || uri.startsWith("/api/v1/auth/user") || uri.startsWith("/api/v1/auth/fcm")){
                UserInfoResponseDto dto = authorizationUtil.Authorize(request);

                if(dto != null && dto.getUserId() != null){
                    request.mutate().header("user_id", String.valueOf(dto.getUserId()));
                    request.mutate().header("user_type", dto.getUserType());
                }else{throw new UnAuthorizedException();}
            }
            return chain.filter(exchange);
        };
    }


    public static class Config {}
}
