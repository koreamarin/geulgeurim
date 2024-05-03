package com.geulgrim.market.market.domain;

import com.geulgrim.market.market.domain.repository.MarketRepository;

import java.util.List;

public enum SearchAndOrderType {

    TITLE_WITH_VIEWCOUNT{
        @Override
        public List<Market> getListBySearchTypeAndOrder(MarketRepository marketRepository, String keyword) {
            return marketRepository.findByTitleContainingOrderByViewCountDesc(keyword);
        }
    },
    CONTENT_WITH_VIEWCOUNT{
        @Override
        public List<Market> getListBySearchTypeAndOrder(MarketRepository marketRepository, String keyword) {
            return marketRepository.findByContentContainingOrderByViewCountDesc(keyword);
        }
    };

    public abstract List<Market> getListBySearchTypeAndOrder(MarketRepository marketRepository, String keyword);

}
