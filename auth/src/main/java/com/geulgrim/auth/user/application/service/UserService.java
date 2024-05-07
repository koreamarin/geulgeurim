package com.geulgrim.auth.user.application.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geulgrim.auth.S3.AwsS3Service;
import com.geulgrim.auth.security.jwt.JWTUtil;
import com.geulgrim.auth.user.application.dto.request.EnterUserLoginRequest;
import com.geulgrim.auth.user.application.dto.request.EnterUserSignUpRequest;
import com.geulgrim.auth.user.application.dto.request.OAuthTokenRequest;
import com.geulgrim.auth.user.application.dto.request.OAuthUserInfoRequest;
import com.geulgrim.auth.user.application.dto.response.EnterUserSignUpResponse;
import com.geulgrim.auth.user.application.dto.response.UserLoginResponse;
import com.geulgrim.auth.user.domain.entity.EnterUser;
import com.geulgrim.auth.user.domain.entity.Enums.Status;
import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import com.geulgrim.auth.user.domain.entity.User;
import com.geulgrim.auth.user.domain.repository.EnterUserRepository;
import com.geulgrim.auth.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Timestamp;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EnterUserRepository enterUserRepository;
    private final AwsS3Service awsS3Service;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 기업 회원가입
    public EnterUserSignUpResponse enterUserSignup(
            EnterUserSignUpRequest enterUserSignUpRequest,
            MultipartFile image_file
            ) {
        String message = null;
        // 이미 가입된 사용자인지 확인
        if (enterUserRepository.existsByCompanyNum(enterUserSignUpRequest.getCompany_num())) {
            message = "회원가입된 회원입니다. 로그인해주세요.";
        }
        else {
            // 유저 DTO 만들기
            User user = User.builder()
                    .email(enterUserSignUpRequest.getEmail())
                    .birthday(enterUserSignUpRequest.getOpening())
                    .name(enterUserSignUpRequest.getRepresentative())
                    .nickname(enterUserSignUpRequest.getBusiness_name())
                    .phone_num(enterUserSignUpRequest.getPhone_num())
                    .userType(UserType.ENTERPRISE)
                    .build();

            userRepository.save(user);

            Timestamp time = new Timestamp(System.currentTimeMillis());

            String file_url = awsS3Service.uploadFile(user.getUser_id(), image_file, time, "user");

            // 기업유저 DTO 만들기
            EnterUser enterUser = EnterUser.builder()
                    .password(bCryptPasswordEncoder.encode(enterUserSignUpRequest.getPassword()))
                    .companyNum(enterUserSignUpRequest.getCompany_num())
                    .manager(enterUserSignUpRequest.getManager())
                    .address(enterUserSignUpRequest.getAddress())
                    .status(Status.YES)
                    .file_url(file_url)
                    .user(user)
                    .build();

            enterUserRepository.save(enterUser);

            message = "회원가입 성공";
        }

        EnterUserSignUpResponse enterUserSignUpResponse = EnterUserSignUpResponse.builder()
                .message(message)
                .build();

        return enterUserSignUpResponse;
    }

    // 이메일 중복 확인
    public String UserEmailCheck(String email) {
        if(userRepository.existsByEmail(email)) {
            return "사용 불가능한 이메일 아이디입니다.";
        }
        return "사용 가능한 이메일 아이디입니다.";
    }

    // 기업 사업자 가입여부 확인
    public String BusinessCheck(String code) {
        if(enterUserRepository.existsByCompanyNum(code)) {
            return "가입된 사업자입니다.";
        }
        return "가입할수 있는 사업자입니다.";
    }

    // 기업 회원 로그인
    public UserLoginResponse EnterUserLogin(EnterUserLoginRequest enterUserLoginRequest) {
        UserLoginResponse userLoginResponse = null;

        Optional<User> user = userRepository.findByEmail(enterUserLoginRequest.getEmail());
        if(user.isEmpty()) throw new NotFoundException("아이디를 찾을 수 없습니다.");
        Optional<EnterUser> enterUser = enterUserRepository.findByUser(user.get());
        if(enterUser.isEmpty()) throw new NotFoundException("아이디를 찾을 수 없습니다.");

        if(bCryptPasswordEncoder.matches(enterUserLoginRequest.getPassword(), enterUser.get().getPassword())) {
            userLoginResponse = UserLoginResponse.builder()
                    .user_id(user.get().getUser_id())
                    .profile_url(user.get().getFile_url())
                    .nickname(user.get().getNickname())
                    .userType(user.get().getUserType())
                    .build();
        }

        return userLoginResponse;
    }
}
