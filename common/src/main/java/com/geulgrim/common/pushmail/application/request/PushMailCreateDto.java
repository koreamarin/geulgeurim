package com.geulgrim.common.pushmail.application.request;

import com.geulgrim.common.pushmail.domain.PushMail;
import com.geulgrim.common.pushmail.domain.PushMailDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMailCreateDto {

    private Long receiverId;
    
    private Long senderId;

    private Long[] favoriteJobs; //관심 공고 리스트

    private String domain;

    public PushMail toEntity(PushMailCreateDto dto) {

        return PushMail.builder()
                .receiverId(dto.getReceiverId())
                .senderId(dto.getSenderId())
                .favoriteJobs(dto.getFavoriteJobs())
                .domain(PushMailDomain.valueOf(dto.getDomain()))
                .title(PushMailDomain.valueOf(domain).generateTitle())
                .content(PushMailDomain.valueOf(domain).generateContent())
                .isChecked(false)
                .build();
    }

}
