package com.geulgrim.community.crew.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;


@Getter
@AllArgsConstructor
public enum CrewErrorCode {
    NOT_EXISTS_CREW_BOARD("존재하지 않는 크루 모집 게시글입니다.", BAD_REQUEST),
    NOT_EXISTS_CREW_REQUEST("존재하지 않는 크루 신청서입니다.", BAD_REQUEST),
    ALREADY_SUBMITTED("이미 지원하셨습니다.", BAD_REQUEST),
    CREATOR_CANNOT_APPLY("크루를 만든 사람은 지원할 수 없습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
