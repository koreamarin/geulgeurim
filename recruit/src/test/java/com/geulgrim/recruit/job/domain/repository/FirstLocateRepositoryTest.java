package com.geulgrim.recruit.job.domain.repository;

import com.geulgrim.recruit.job.IntegrationTestSupport;
import com.geulgrim.recruit.job.domain.entity.FirstLocate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class FirstLocateRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private FirstLocateRepository firstLocateRepository;

    @DisplayName("FirstLocateKey를 이용하여 FirstLocate를 조회한다.")
    @Test
    void findByFirstLocateKey() {
        // given
        FirstLocate firstLocate = FirstLocate.builder()
                .firstLocateKey(101000L)
                .firstLocateName("서울전체")
                .build();

        firstLocateRepository.save(firstLocate);

        // when
        Optional<FirstLocate> findFirstLocate = firstLocateRepository.findByFirstLocateKey(101000L);

        // then
        assertThat(findFirstLocate.orElseThrow())
                .extracting("firstLocateKey", "firstLocateName")
                .containsExactly(101000L, "서울전체");

    }
}