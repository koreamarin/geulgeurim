package com.geulgrim.market.market.exception;

public class NoMarketExistException extends RuntimeException{

    private static final String error = "[ERROR] 존재하지 않는 판매 게시글입니다";
    public NoMarketExistException(){
        super(error);
    }
}
