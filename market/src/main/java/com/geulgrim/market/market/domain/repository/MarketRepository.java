package com.geulgrim.market.market.domain.repository;

import com.geulgrim.market.market.domain.Market;
import com.geulgrim.market.market.domain.MarketLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketRepository extends JpaRepository<Market, Long> {

    List<Market> findByTitleContaining(String title);
    List<Market> findByTitleContainingOrderByViewCountDesc(String title);

    List<Market> findByContentContaining(String content);
    List<Market> findByContentContainingOrderByViewCountDesc(String content);

    List<Market> findAllByOrderByViewCountDesc();

    @Query("select m from Market m where m.seller = :sellerId")
    List<Market> findBySellerId(Long sellerId);

    @Query("select ml from MarketLog ml where ml.piece = :pieceId")
    List<MarketLog> findMarketLogsByPieceId(Long pieceId);
}
