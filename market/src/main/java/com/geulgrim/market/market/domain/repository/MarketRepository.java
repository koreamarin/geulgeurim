package com.geulgrim.market.market.domain.repository;

import com.geulgrim.market.market.domain.Market;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketRepository extends JpaRepository<Market, Long> {

    @Query("select m from Market m where m.seller = :sellerId")
    List<Market> findBySellerId(Long sellerId);
}
