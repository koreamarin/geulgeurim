package com.geulgrim.community.share.application.service;

import com.geulgrim.community.global.file.entity.FileUrl;
import com.geulgrim.community.global.file.repository.FileUrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ShareImageService {

    private final FileUrlRepository fileUrlRepository;

    public List<FileUrl> getFileUrl(long shareImageId) {
        return fileUrlRepository.findFileUrlByShareId(shareImageId);
    }
}
