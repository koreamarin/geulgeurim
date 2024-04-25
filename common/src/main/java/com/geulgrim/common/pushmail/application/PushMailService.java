package com.geulgrim.common.pushmail.application;

import com.geulgrim.common.pushmail.application.request.PushMailCreateDto;
import com.geulgrim.common.pushmail.application.response.PushMailResponseDto;
import com.geulgrim.common.pushmail.domain.PushMail;
import com.geulgrim.common.pushmail.domain.PushMailDomain;
import com.geulgrim.common.pushmail.domain.respository.PushMailRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class PushMailService {

    private final PushMailRepository pushMailRepository;

    private static MailSender mailSender;

    //userRepository 필요
    //jobrepository 필요

    public PushMailResponseDto create(PushMailCreateDto dto) {

        PushMail pushMail = dto.toEntity(dto);
        PushMailDomain domain = PushMailDomain.valueOf(dto.getDomain());

        if (domain.isNeedNickName()) {
            //유저에서 sender 닉네임 얻어서 title 수정
        } else if (domain.isNeedJobTitle()) {
            //구인에서 공고제목 얻어서 content 수정
        }

        //exception 처리
        //User rcvUser = userRepository.findById(dto.getReceiverId()).orElseThrow(NoUserExistException::new);
        //String rcvNickname = rcvUser.getNickname();
        //String rcvAddress = rcvUser.getAddress();
        String rcvNickname = "nickname";
        String rcvAddress = "senyvee9@gmail.com";
        //메일 보내기
        mailSender.sendPushMail(pushMail, rcvAddress, rcvNickname);

        //메일 로그 저장
        pushMailRepository.save(pushMail);

        return PushMailResponseDto.builder()
                .receiverId(dto.getReceiverId())
                .senderId(dto.getSenderId())
                .favoriteJobs(dto.getFavoriteJobs())
                .domain(domain)
                .title(pushMail.getTitle())
                .content(pushMail.getContent())
                .build();
    }
}
