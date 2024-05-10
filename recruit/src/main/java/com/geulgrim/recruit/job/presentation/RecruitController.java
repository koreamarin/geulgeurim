package com.geulgrim.recruit.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecruitController {

    @GetMapping
    public ResponseEntity<String> Test() {
        return new ResponseEntity<>("테스트완료", HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity
    
}
