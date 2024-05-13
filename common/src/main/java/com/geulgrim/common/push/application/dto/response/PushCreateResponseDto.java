package com.geulgrim.common.push.application.dto.response;

import com.geulgrim.common.push.domain.FavoriteJob;
import com.geulgrim.common.push.domain.PushDomain;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    private List<FavoriteJob> favoriteJobList; //즐겨찾기 공고 리스트

    private PushDomain domain;

    private String title;

    private String content;
}
