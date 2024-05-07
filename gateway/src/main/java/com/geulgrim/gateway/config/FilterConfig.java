package com.geulgrim.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route("eureka-client-common", p -> p.path("/api/v1/common/**")
                        .uri("http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8081"))
                .route("eureka-client-community", p -> p.path("/api/v1/community/**")
                        .uri("http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8082"))
                .route("eureka-client-market", p -> p.path("/api/v1/market/**")
                        .uri("http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8083"))
                .route("eureka-client-recruit", p -> p.path("/api/v1/recruit/**")
                        .uri("http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8084"))
                .route("eureka-client-auth", p -> p.path("/api/v1/auth/**")
                        .uri("http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8085"))
                .build();
    }
}
