package com.geulgrim.community.share.application.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShareImageResponse {
    private long shareImageId;
    private String fileUrl;
}
