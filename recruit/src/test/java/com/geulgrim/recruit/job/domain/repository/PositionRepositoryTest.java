package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.Position;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class PositionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private PositionRepository positionRepository;

    @DisplayName("PositionId로 Position을 조회한다.")
    @Test
    void findByPositionId() {
        // given
        Position position1 = Position.builder()
                .positionName("선화")
                .build();

        Position position2 = Position.builder()
                .positionName("밑색")
                .build();

        positionRepository.saveAll(List.of(position1, position2));

        // when
        Optional<Position> findPosition1 = positionRepository.findByPositionId(1L);
        Optional<Position> findPosition2 = positionRepository.findByPositionId(2L);

        // then
        assertThat(findPosition1.orElseThrow())
                .extracting("positionName")
                .isEqualTo("선화");
        
        assertThat(findPosition2.orElseThrow())
                .extracting("positionName")
                .isEqualTo("밑색");
    }
}