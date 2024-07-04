package com.geulgrim.recruit.job.application.dto.response;

import lombok.*;

import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetResumesResponses {
    private List<GetResumesResponse> getResumesResponse;
    private int totalPage;
}