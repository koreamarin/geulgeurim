package com.geulgrim.community.crew.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.geulgrim.community.crew.domain.entity.enums.BoardStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter @Setter
public class CrewBoardRequest {

    private String projectName;
    private String content;
    private Integer pen;
    private Integer color;
    private Integer bg;
    private Integer pd;
    private Integer story;
    private Integer conti;
    private BoardStatus status;
    private List<MultipartFile> imageList;

}
