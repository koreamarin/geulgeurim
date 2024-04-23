package com.geulgrim.common.portfolio.service;

import com.geulgrim.common.portfolio.dto.PortfolioResponse;
import com.geulgrim.common.portfolio.entity.Portfolio;
import com.geulgrim.common.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public List<PortfolioResponse> getPortfolios(Long userId) {

        List<Portfolio> portfolios = portfolioRepository.findAllByUserId(userId);

        return portfolios.stream()
                .map(portfolio -> {
                    PortfolioResponse response = new PortfolioResponse();
                    response.setPofolId(portfolio.getPofolId());
                    response.setPofolName(portfolio.getPofolName());
                    response.setStatus(portfolio.getStatus());
                    return response;
                })
                .collect(Collectors.toList());

    }
}
