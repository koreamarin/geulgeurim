package com.geulgrim.auth.user.application.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.geulgrim.auth.S3.AwsS3Service;
import com.geulgrim.auth.security.jwt.JWTUtil;
import com.geulgrim.auth.user.Exception.NoUserExistException;
import com.geulgrim.auth.user.application.dto.request.*;
import com.geulgrim.auth.user.application.dto.response.*;
import com.geulgrim.auth.user.domain.entity.EnterUser;
import com.geulgrim.auth.user.domain.entity.Enums.Status;
import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import com.geulgrim.auth.user.domain.entity.User;
import com.geulgrim.auth.user.domain.repository.EnterUserRepository;
import com.geulgrim.auth.user.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final EnterUserRepository enterUserRepository;
    private final AwsS3Service awsS3Service;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTUtil jwtUtil;

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

        User user = userRepository.findByEmail(enterUserLoginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException("이메일 아이디를 찾을 수 없습니다."));
        EnterUser enterUser = enterUserRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("기업계정을 찾을 수 없습니다."));

        // 토큰발급
        String AccessToken = jwtUtil.createAccessToken(user.getUser_id(), user.getUserType());
        String RefrashToken = jwtUtil.createRefreshToken(user.getUser_id(), user.getUserType());

        if(bCryptPasswordEncoder.matches(enterUserLoginRequest.getPassword(), enterUser.getPassword())) {
            userLoginResponse = UserLoginResponse.builder()
                    .user_id(user.getUser_id())
                    .profile_url(user.getFile_url())
                    .nickname(user.getNickname())
                    .userType(user.getUserType())
                    .AccessToken(AccessToken)
                    .RefrashToken(RefrashToken)
                    .build();
        }

        return userLoginResponse;
    }

    // 개인 유저 전체 조회
    public GetUsersResponses getUsers() {

        List<User> users = userRepository.findAll();

        GetUsersResponses getUsersResponses = new GetUsersResponses();
        List<Long> userIds = new ArrayList<>();

        for(User user : users) {
            userIds.add(user.getUser_id());
        }

        getUsersResponses.setUserIds(userIds);

        return getUsersResponses;
    }

    public GetUserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        GetUserResponse getUserResponse = GetUserResponse.builder()
                .userId(user.getUser_id())
                .email(user.getEmail())
                .birthday(user.getBirthday())
                .name(user.getName())
                .nickname(user.getNickname())
                .wallet(user.getWallet())
                .userType(String.valueOf(user.getUserType()))
                .fileUrl(user.getFile_url())
                .phoneNum(user.getPhone_num())
                .build();

        return getUserResponse;
    }

    //fcmToken 포함 유저 정보 가져오는 로직
    public UserInfoResponse getUserInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(NoUserExistException::new);

        return UserInfoResponse.builder()
                .userId(user.getUser_id())
                .email(user.getEmail())
                .birthday(user.getBirthday())
                .name(user.getName())
                .nickname(user.getNickname())
                .wallet(user.getWallet())
                .userType(String.valueOf(user.getUserType()))
                .fileUrl(user.getFile_url())
                .phoneNum(user.getPhone_num())
                .fcmToken(user.getFcmToken())
                .build();
    }

    public GetEnterUserResponse getEnterUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        EnterUser enterUser = enterUserRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("기업계정을 찾을 수 없습니다."));

        GetEnterUserResponse getEnterUserResponse = GetEnterUserResponse.builder()
                .userId(user.getUser_id())
                .CEO_name(user.getName())
                .manager(enterUser.getManager())
                .company(user.getNickname())
                .thumbnail(user.getFile_url())
                .birthday(user.getBirthday())
                .address(enterUser.getAddress())
                .introduce(enterUser.getIntroduce())
                .build();

        return getEnterUserResponse;
    }

    public void updateUserFcm(FcmUpdateRequestDto dto, Long userId) {

        log.info("update token userId: " + userId);
        log.info("token: " + dto.getFcmToken());

        User user = userRepository.findById(userId).orElseThrow(NoUserExistException::new);
        user.updateFcmToken(dto.getFcmToken());
    }

}
