package com.geulgrim.common.pushmail.application.response;

import com.geulgrim.common.pushmail.domain.PushMailDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMailResponseDto {

    private Long receiverId;

    private Long senderId;

    private Long[] favoriteJobs;

    private PushMailDomain domain;

    private String title;

    private String content;
}
