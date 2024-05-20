package com.geulgrim.auth.user.application.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ResponseBody
public class GetEnterUserResponse {
    private Long userId;
    private String CEO_name;
    private String manager;
    private String company;
    private String thumbnail;
    private String birthday;
    private String address;
    private String introduce;
}
