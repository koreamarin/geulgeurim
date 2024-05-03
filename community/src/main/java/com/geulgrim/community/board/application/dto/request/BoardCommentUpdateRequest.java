package com.geulgrim.community.board.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCommentUpdateRequest {
    private long boardId;
    private String content;
}
