package com.a503.churros.config.security.advice.payload;

import lombok.Getter;

@Getter
public enum ErrorCode {
    INVALID_PARAMETER(400, null, "잘못된 요청 데이터 입니다."),
    INVALID_REPRESENTATION(400, null, "잘못된 표현 입니다."),
    INVALID_FILE_PATH(400, null, "잘못된 파일 경로 입니다."),
    INVALID_OPTIONAL_ISPRESENT(400, null, "해당 값이 존재하지 않습니다."),
    INVALID_CHECK(400, null, "해당 값이 유효하지 않습니다."),
    INVALID_AUTHENTICATION(400, null, "not right authentication."),


    MALFORMED_JWT(500,null,"malformed jwt"),
    BAD_SIGNATURE(500,null,"signature error."),
    TOKEN_EXPIRED(500,null, "token expired."),

    NOT_SUPPORTED_TOKEN(500,null,"not supported token."),

    INVALID_TOKEN(500,null,"invalid token."),

    OTHER_JWT_ERROR(500,null,"other jwt error."),

    AUTHENTICATION_ERROR(500,null,"authentication error."),

    MALFORMED_JWT_REFRESH(500,null,"malformed jwt refresh"),
    BAD_SIGNATURE_REFRESH(500,null,"refresh signature error ."),
    TOKEN_EXPIRED_REFRESH(500,null, "refresh token expired."),

    NOT_SUPPORTED_TOKEN_REFRESH(500,null,"not supported refresh token."),

    INVALID_TOKEN_REFRESH(500,null,"invalid refresh token."),

    OTHER_JWT_ERROR_REFRESH(500,null,"other refresh jwt error.");

    private final String code;
    private final String message;
    private final int status;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }
}
