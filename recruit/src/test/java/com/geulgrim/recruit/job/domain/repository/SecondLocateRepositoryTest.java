package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.FirstLocate;
import com.geulgrim.recruit.job.domain.entity.SecondLocate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class SecondLocateRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private FirstLocateRepository firstLocateRepository;

    @Autowired
    private SecondLocateRepository secondLocateRepository;

    @DisplayName("secondLocateKey를 이용하여 SecondLocate를 조회한다.")
    @Test
    void findBySecondLocateKey() {
        // given
        FirstLocate firstLocate = FirstLocate.builder()
                .firstLocateKey(101000L)
                .firstLocateName("서울전체")
                .build();

        firstLocateRepository.save(firstLocate);

        SecondLocate secondLocate1 = SecondLocate.builder()
                .secondLocateKey(101010L)
                .firstLocate(firstLocate)
                .secondLocateName("강남구")
                .build();

        SecondLocate secondLocate2 = SecondLocate.builder()
                .secondLocateKey(101020L)
                .firstLocate(firstLocate)
                .secondLocateName("강동구")
                .build();

        secondLocateRepository.saveAll(List.of(secondLocate1, secondLocate2));

        // when
        SecondLocate findSecondLocate = secondLocateRepository.findBySecondLocateKey(101010L).orElseThrow();

        // then
        assertThat(findSecondLocate)
                .extracting("secondLocateKey", "secondLocateName")
                .containsExactlyInAnyOrder(101010L, "강남구");

    }

}