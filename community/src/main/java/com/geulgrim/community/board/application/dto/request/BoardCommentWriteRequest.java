package com.geulgrim.community.board.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCommentWriteRequest {
    private long boardId;
    private String content;
}
