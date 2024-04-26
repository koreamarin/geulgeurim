package com.geulgrim.common.pushmail.application.response;

import com.geulgrim.common.pushmail.domain.PushMailDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMailResponseDto {

    private Long receiverId;

    private Long senderId;

    private List<Long> favoriteJobList;

    private PushMailDomain domain;

    private String title;

    private String content;
}
