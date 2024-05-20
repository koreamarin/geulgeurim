package com.geulgrim.market.market.exception;

public class GetApiFailedException extends RuntimeException{

    private static final String error = "[ERROR] 이더리움 시세 api 호출 실패";

    public GetApiFailedException() {
        super(error);
    }
}
