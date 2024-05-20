package com.geulgrim.community.board.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class BoardWriteRequest {
    private String title;
    private String content;
}
