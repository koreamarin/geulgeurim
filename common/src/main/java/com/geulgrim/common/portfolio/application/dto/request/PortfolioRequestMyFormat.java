package com.geulgrim.common.portfolio.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.geulgrim.common.portfolio.domain.entity.enums.OpenState;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class PortfolioRequestMyFormat {

    @JsonProperty("pofol_name")
    private String pofolName;

    // 공개 여부
    private OpenState status;

    // 파일
    private List<MultipartFile> fileList;

}
