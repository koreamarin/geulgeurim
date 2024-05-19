package com.geulgrim.common.push.application.dto.response;

import com.geulgrim.common.push.domain.PushDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushCreateResponseDto {

    private Long receiverId;

    private Long senderId;

    private List<Long> favoriteJobList; //즐겨찾기 공고 id 리스트

    private PushDomain domain;

    private String title;

    private String content;
}
