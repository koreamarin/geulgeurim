package com.geulgrim.community.global.s3;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/s3/file")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;

//    @PostMapping("/uploadFile")
//    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile multipartFile){
//        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFile));
//    }
    @DeleteMapping("/deleteFile/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName){
        awsS3Service.deleteFile(fileName);
        return ResponseEntity.ok("삭제된 파일: " + fileName);
    }
}

