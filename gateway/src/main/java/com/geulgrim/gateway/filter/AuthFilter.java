package com.geulgrim.gateway.filter;

import com.geulgrim.gateway.dto.UserInfoResponseDto;
import com.geulgrim.gateway.exception.UnAuthorizedException;
import com.geulgrim.gateway.util.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final JWTUtil jwtUtil = new JWTUtil();

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            log.info("request.getHeaders().containsKey(\"Authorization\") : ", request.getHeaders().containsKey("Authorization"));

            String header = (String) request.getHeaders().getFirst("Authorization");
            log.info("header : ",header);

            if (header == null || !header.startsWith("Bearer ")) {
                throw new UnAuthorizedException();
            } else {
                String token = header.replace("Bearer ","");
                log.info("token : ",token);
                UserInfoResponseDto dto = jwtUtil.getUserInfo(token);
                log.info("userId : ",dto.getUserId());
                log.info("userType : ",dto.getUserType());
                request.mutate().header("userId", String.valueOf(dto.getUserId()));
                request.mutate().header("userType", dto.getUserType());
                log.info("At the end of the filter request.getHeaders() : ", request.getHeaders());
            }
            return chain.filter(exchange.mutate().request(request).build());
        });
    }

    public static class Config {}
}
