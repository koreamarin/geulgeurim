package com.geulgrim.community.board.application.service;

import com.geulgrim.community.board.application.dto.response.BoardResponse;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.repository.BoardRepository;
import com.geulgrim.community.global.file.repository.FileUrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final FileUrlRepository urlRepository;

    public List<BoardResponse> mainBoardPopularList() {
        List<BoardResponse> list = boardRepository.findBoardResponseList();
        return list.subList(0, 6);
    }

    public List<BoardResponse> mainBoardNewList() {
        List<BoardResponse> list = boardRepository.findBoardResponseList();
        List<BoardResponse> newList = new ArrayList<BoardResponse>();
        for(BoardResponse boardResponse : list) {
            if(boardResponse.getHit() + boardResponse.getCommentCnt() >= 50) {
                newList.add(boardResponse);
            }
        }
        return newList;
    }

    public List<BoardResponse> boardList() {
        return boardRepository.findBoardResponseList();
    }

}
