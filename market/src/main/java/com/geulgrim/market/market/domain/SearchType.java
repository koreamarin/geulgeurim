package com.geulgrim.market.market.domain;

import com.geulgrim.market.market.domain.repository.MarketRepository;

import java.util.List;

public enum SearchType {

    TITLE{
        @Override
        public List<Market> getListBySearchType(MarketRepository marketRepository, String keyword){
            return marketRepository.findByTitleContaining(keyword);
        }
    },
    CONTENT{
        @Override
        public List<Market> getListBySearchType(MarketRepository marketRepository, String keyword){
            return marketRepository.findByContentContaining(keyword);
        }
    };

    public abstract List<Market> getListBySearchType(MarketRepository marketRepository, String keyword);

}
