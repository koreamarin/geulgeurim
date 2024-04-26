package com.geulgrim.common.portfolio.application.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.geulgrim.common.portfolio.domain.entity.enums.OpenState;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class PortfolioRequestMyFormat {

    @JsonProperty("pofol_name")
    private String pofolName;

    private OpenState status;

    @JsonProperty("file_url")
    private ArrayList<String> fileUrl;

}
