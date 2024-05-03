package com.geulgrim.market.market.exception;

public class JsonProcessingFailedException extends RuntimeException{

    private static final String error = "[ERROR] JSON 파싱 중 문제가 발생했습니다";
    public JsonProcessingFailedException() {
        super(error);
    }
}
