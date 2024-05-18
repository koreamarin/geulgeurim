package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardCustomRepository {
    Page<BoardListResponse> searchBoards(String keyword, String searchType, String sort, Pageable pageable);
    Page<BoardListResponse> findBoardResponseList(Pageable pageable);
}
