package com.geulgrim.community.board.application.dto.response;

import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.BoardComment;
import com.geulgrim.community.board.domain.entity.BoardImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponse {
    private Board board;
    private List<BoardComment> commentList;
    private List<BoardImage> imageList;
}
