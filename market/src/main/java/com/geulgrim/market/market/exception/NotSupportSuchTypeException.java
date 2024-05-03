package com.geulgrim.market.market.exception;

public class NotSupportSuchTypeException extends RuntimeException{

    private static final String error = "[ERROR] 지원하지 않는 필터타입입니다 ";

    public NotSupportSuchTypeException(){
        super(error);
    }
}
