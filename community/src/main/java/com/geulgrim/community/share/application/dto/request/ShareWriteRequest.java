package com.geulgrim.community.share.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class ShareWriteRequest {
    private String title;
    private String content;
    private List<MultipartFile> imageList;
}
