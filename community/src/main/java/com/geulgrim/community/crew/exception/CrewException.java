package com.geulgrim.community.crew.exception;

import lombok.Getter;

@Getter
public class CrewException extends RuntimeException {

    private final CrewErrorCode errorCode;

    public CrewException(CrewErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
