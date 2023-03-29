package com.a503.churros.controller.auth.handler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.HashMap;

@RestControllerAdvice
public class ControllerSupport {

    @ExceptionHandler(Exception.class)
    public ResponseEntity errorHandler(){
        return ResponseEntity.badRequest().body( new HashMap<String,String>(){{
            put("message","그냥 오류입니다.");
        }});
    }
}
