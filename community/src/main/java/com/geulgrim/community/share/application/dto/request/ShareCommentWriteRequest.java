package com.geulgrim.community.share.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShareCommentWriteRequest {
    private long shareId;
    private String content;
}
