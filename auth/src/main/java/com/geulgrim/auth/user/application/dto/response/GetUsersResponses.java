package com.geulgrim.auth.user.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ResponseBody
public class GetUsersResponses {

    private List<Long> userIds;
}
