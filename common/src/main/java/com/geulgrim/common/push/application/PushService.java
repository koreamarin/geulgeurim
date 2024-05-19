package com.geulgrim.common.push.application;

import com.geulgrim.common.authserver.application.dto.response.UserResponseDto;
import com.geulgrim.common.authserver.exception.NoUserExistException;
import com.geulgrim.common.authserver.presentation.AuthFeignClient;
import com.geulgrim.common.push.application.dto.request.FCMDto;
import com.geulgrim.common.push.application.dto.request.PushCreateRequestDto;
import com.geulgrim.common.push.application.dto.response.PushCreateResponseDto;
import com.geulgrim.common.push.application.dto.response.PushResponseDto;
import com.geulgrim.common.push.domain.Push;
import com.geulgrim.common.push.domain.PushDomain;
import com.geulgrim.common.push.domain.repository.PushRepository;
import com.geulgrim.common.push.infrastructure.fcm.util.WebSender;
import com.geulgrim.common.push.infrastructure.mail.util.MailSender;
import com.geulgrim.common.recruitserver.application.dto.response.SimpleJobResponseDto;
import com.geulgrim.common.recruitserver.presentation.RecruitFeignClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PushService {

    private final PushRepository pushRespository;

    private final MailSender mailSender;

    private final WebSender webSender;

    private final AuthFeignClient authFeignClient;

    private final RecruitFeignClient recruitFeignClient;

    public PushCreateResponseDto create(PushCreateRequestDto dto, Long userId) {

        log.info("createDto의 domain 값 = {} ", dto.getDomain());
        Push push = dto.toEntity(dto, userId);
        PushDomain domain = PushDomain.valueOf(dto.getDomain());
        log.info("domain Enum 값 ={} ", domain);

        if (domain.isNeedNickName()) {
            log.info("닉네임이 필요한 푸시메일 ={}", domain);

            //auth에서 sender 닉네임 얻어서 title 수정
            String senderNick = authFeignClient.getUserInfo(userId).getNickname();
            push.updateTitle(senderNick);
        }

        //알람 수신자 정보 얻기
        UserResponseDto rcvUser = authFeignClient.getUserInfo(dto.getReceiverId());
        log.info("rcvuser name: ", rcvUser.getName());
        log.info("rcvuser fcmToken: ", rcvUser.getName());
        //exception 처리
        String rcvNickname = rcvUser.getNickname();
        String rcvEmail = rcvUser.getEmail();

        //pushmail
        //이후 푸시메일을 동의한 경우만 수신가능하도록 변경 필요
        log.info("rcvNickname = {} ", rcvNickname);
        log.info("rcvEmail = {} ", rcvEmail);
        log.info("메일푸시 시작");
        mailSender.sendMailPush(push, rcvEmail, rcvNickname);

        //fcm
        log.info("fcm웹푸시 시작");
        FCMDto fcmDto = FCMDto.of(rcvUser, push);
        webSender.sendWebPush(fcmDto);

        //메일 로그 저장
        pushRespository.save(push);

        return PushCreateResponseDto.builder()
                .receiverId(dto.getReceiverId())
                .senderId(userId)
                .favoriteJobList(dto.getFavoriteJobs())
                .domain(domain)
                .title(push.getTitle())
                .content(push.getContent())
                .build();

    }

    public PushCreateResponseDto createBatch(PushCreateRequestDto dto) {

        log.info("createDto의 domain 값 = {} ", dto.getDomain());
        Push push = dto.toEntityByBatch(dto);
        PushDomain domain = PushDomain.valueOf(dto.getDomain());
        log.info("domain Enum 값 ={} ", domain);

        //구인에서 공고제목 얻어서 content 수정, 이후 페이지 링크로 수정
        if(domain.isNeedJobTitle()){
            StringBuilder jobContent = new StringBuilder();
            for (Long jobId : dto.getFavoriteJobs()) {
                SimpleJobResponseDto jobSimple = recruitFeignClient.getJobSimple(jobId);
                jobContent.append(jobSimple.getCompanyName()).append(" 회사의\n").append(jobSimple.getTitle()).append("공고가\n").append(jobSimple.getEndDate()).append("에 마감되요!\n얼른 지원하러 가볼까요?");
                jobContent.append("\n\n");
            }
            push.updateContent(jobContent.toString());
            log.info("push 업데이트: ", push.getContent());

        }


        UserResponseDto rcvUser = authFeignClient.getUserInfo(dto.getReceiverId());
        //exception 처리
        if (rcvUser == null){
            throw new NoUserExistException();
        }
        String rcvNickname = rcvUser.getNickname();
        String rcvEmail = rcvUser.getEmail();

        //pushmail
        //이후 푸시메일을 동의한 경우만 수신가능하도록 변경 필요
        log.info("rcvNickname = {} ", rcvNickname);
        log.info("rcvEmail = {} ", rcvEmail);
        log.info("메일푸시 시작");
        mailSender.sendMailPush(push, rcvEmail, rcvNickname);

        //fcm
        log.info("fcm웹푸시 시작");
        FCMDto fcmDto = FCMDto.of(rcvUser, push);
        webSender.sendWebPush(fcmDto);

        //메일 로그 저장
        pushRespository.save(push);

        return PushCreateResponseDto.builder()
                .receiverId(dto.getReceiverId())
                .senderId(dto.getSenderId())
                .favoriteJobList(dto.getFavoriteJobs())
                .domain(domain)
                .title(push.getTitle())
                .content(push.getContent())
                .build();
    }

    public List<PushResponseDto> getPush(Long id) {
        List<Push> response = pushRespository.findAllByreceiverIdOrderByIdDesc(id);
        return response.stream()
                .map(PushResponseDto::from)
                .collect(Collectors.toList());

    }
}
