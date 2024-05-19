package com.geulgrim.common.portfolio.exception;

import lombok.Getter;

@Getter
public class PortfolioException extends RuntimeException {

    private final PortfolioErrorCode errorCode;

    public PortfolioException(PortfolioErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
