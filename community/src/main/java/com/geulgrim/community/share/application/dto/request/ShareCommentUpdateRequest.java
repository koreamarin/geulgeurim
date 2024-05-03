package com.geulgrim.community.share.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShareCommentUpdateRequest {
    private long shareId;
    private String content;
}
