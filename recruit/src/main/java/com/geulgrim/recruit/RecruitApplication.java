package com.geulgrim.recruit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

//@EnableDiscoveryClient
@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class RecruitApplication {

    public static void main(String[] args) {
        System.setProperty("server.servlet.context-path", "/api/v1/recruit");
        SpringApplication.run(RecruitApplication.class, args);
    }

}
