package com.geulgrim.common.push.application.dto.response;

import com.geulgrim.common.push.domain.PushDomain;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;

import java.util.List;

@Builder
public class PushCreateResponseDto {

    private Long receiverId;

    private Long senderId;

    @ElementCollection
    private List<Long> favoriteJobList; //즐겨찾기 공고 리스트

    @Enumerated(value = EnumType.STRING)
    private PushDomain domain;

    private String title;

    private String content;
}
