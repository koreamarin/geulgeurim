package com.geulgrim.recruit.job.application.dto.response;

import com.geulgrim.recruit.job.domain.entity.Star;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserStarsResponseDto {
    private Long id;

    public static UserStarsResponseDto from(Star star){
        return UserStarsResponseDto.builder()
                .id(star.getStarId())
                .build();
    }
}
