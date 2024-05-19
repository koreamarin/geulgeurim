package com.geulgrim.community.board.application.dto.response;

import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardComment;
import com.geulgrim.community.board.domain.entity.BoardImage;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponse {
    private BoardResponse board;
    private List<BoardCommentResponse> commentList;
    private List<BoardImage> imageList;
}
