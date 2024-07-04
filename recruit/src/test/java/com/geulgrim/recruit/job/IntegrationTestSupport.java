package com.geulgrim.recruit.job;

import com.geulgrim.recruit.global.S3.AwsS3Service;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public class IntegrationTestSupport {
    @MockBean
    protected AwsS3Service awsS3Service;
}
