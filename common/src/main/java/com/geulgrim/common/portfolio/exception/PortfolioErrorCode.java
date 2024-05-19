package com.geulgrim.common.portfolio.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum PortfolioErrorCode {
    NOT_EXISTS_PORTFOLIO("존재하지 않는 포트폴리오입니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
