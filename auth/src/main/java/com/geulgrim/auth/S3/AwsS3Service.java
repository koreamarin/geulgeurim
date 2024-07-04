package com.geulgrim.auth.S3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AwsS3Service {
    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String uploadFile(Long userId, MultipartFile file, Timestamp time, String boardType){
        String fileName = createFileName(userId,file.getOriginalFilename(),time, boardType);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try(InputStream inputStream = file.getInputStream()){
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

        return getUrl(fileName);
    }
    public List<String> uploadFile(Long userId, List<MultipartFile> multipartFiles, Timestamp time, String boardType){
        List<String> fileNameList = new ArrayList<>();

        // forEach 구문을 통해 multipartFiles 리스트로 넘어온 파일들을 순차적으로 fileNameList 에 추가
        multipartFiles.forEach(file -> {
            String fileName = createFileName(userId, file.getOriginalFilename(),time,boardType);
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try(InputStream inputStream = file.getInputStream()){
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e){
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            fileNameList.add(fileName);

        });

        List<String> url = new ArrayList<>();
        for(String fileName : fileNameList){
            url.add(getUrl(fileName));
        }
        return url;
    }

    public String createFileName(Long userId, String fileName, Timestamp time, String boardType) {
        // 파일명 생성에 사용될 날짜 포맷 설정
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

        // 파일명 생성에 사용될 현재 날짜 문자열 가져오기
        String currentDate = dateFormat.format(new Date(time.getTime()));

        // 파일명 생성

        return String.format("%s/%d_%s.%s", boardType, userId, currentDate, getFileExtension(fileName));
    }

    // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기위해, "."의 존재 유무만 판단하였습니다.
    private String getFileExtension(String fileName){
        try{
            return fileName.substring(fileName.lastIndexOf(".")+1);
        } catch (StringIndexOutOfBoundsException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일" + fileName + ") 입니다.");
        }
    }


    public void deleteFile(String fileName){
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
        System.out.println(bucket);
    }

    public String getUrl(String fileName) {
        try {
            // 요청한 파일이 존재하는지 확인합니다.
            if (!amazonS3.doesObjectExist(bucket, fileName)) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "요청한 파일을 찾을 수 없습니다.");
            }
            // 파일이 존재한다면 URL을 생성하여 반환합니다.
            URL fileUrl = amazonS3.getUrl(bucket, fileName);
            return fileUrl.toString();
        } catch (AmazonServiceException e) {
            // AWS S3 서비스 관련 예외 처리
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "S3 서비스 오류가 발생했습니다.");
        } catch (SdkClientException e) {
            // AWS SDK 클라이언트 관련 예외 처리
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "S3 연결 오류가 발생했습니다.");
        }
    }
}