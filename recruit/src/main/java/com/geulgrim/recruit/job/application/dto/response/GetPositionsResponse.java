package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.Position;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class GetPositionsResponse {
    private List<Position> positions;
}
