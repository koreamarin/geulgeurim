package com.geulgrim.common.user.Exception;

public class NoUserExistException extends RuntimeException{

    private static final String MESSAGE = "[ERROR] 회원 정보가 존재하지 않습니다";

    public NoUserExistException(){
        super(MESSAGE);
    }
}
