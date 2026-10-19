package com.footprint.backend.exception;

import com.footprint.backend.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// 던져진 예외를 받아 status와 ApiErrorResponse로 바꿔 응답합니다.
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleNotFound(NotFoundException e) {
        return new ApiErrorResponse("NOT_FOUND", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleNotValid(MethodArgumentNotValidException e) {
        return new ApiErrorResponse("INVALID_INPUT", "BadRequest");
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleNotReadable(HttpMessageNotReadableException e) {
        return new ApiErrorResponse("INVALID_INPUT", "요청 body의 형식이 올바르지 않습니다");
    }

}
