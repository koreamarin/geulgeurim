package com.geulgrim.common.piece.exception;

public class NoPieceExistException extends RuntimeException{

    private static final String error = "[ERROR] 존재하지 않는 작품입니다. ";
    public NoPieceExistException(){
        super(error);
    }
}
