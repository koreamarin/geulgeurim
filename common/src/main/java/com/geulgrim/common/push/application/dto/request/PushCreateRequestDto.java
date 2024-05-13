package com.geulgrim.common.push.application.dto.request;

import com.geulgrim.common.push.domain.FavoriteJob;
import com.geulgrim.common.push.domain.Push;
import com.geulgrim.common.push.domain.PushDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushCreateRequestDto {

    private Long receiverId;

    private Long senderId;

    private List<FavoriteJob> favoriteJobs; //관심 공고 리스트

    private String domain;

    public Push toEntity(PushCreateRequestDto dto) {

        return Push.builder()
                .receiverId(dto.getReceiverId())
                .senderId(dto.getSenderId())
                .favoriteJobList(dto.getFavoriteJobs())
                .domain(PushDomain.valueOf(domain))
                .title(PushDomain.valueOf(domain).generateTitle())
                .content(PushDomain.valueOf(domain).generateContent())
                .build();

    }

}
