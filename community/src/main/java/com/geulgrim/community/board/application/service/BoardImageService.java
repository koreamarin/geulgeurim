package com.geulgrim.community.board.application.service;

import com.geulgrim.community.board.domain.repository.BoardImageRepository;
import com.geulgrim.community.global.file.entity.FileUrl;
import com.geulgrim.community.global.file.repository.FileUrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardImageService {

    private final BoardImageRepository boardImageRepository;
    private final FileUrlRepository fileUrlRepository;

    public List<FileUrl> getFileUrl(long boardImageId) {
        return fileUrlRepository.findFileUrlByBoardId(boardImageId);
    }
}
