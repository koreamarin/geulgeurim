package com.geulgrim.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableDiscoveryClient
public class AuthApplication {

    public static void main(String[] args) {
        System.setProperty("server.servlet.context-path", "/api/v1/auth");
        SpringApplication.run(AuthApplication.class, args);
    }

}
