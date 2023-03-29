package com.a503.churros.controller.auth.handler;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.HashMap;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ControllerSupport {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity errorHandler(){
        return ResponseEntity.badRequest().body( new HashMap<String,Object>(){{
            put("code",500);
            put("message","No value");
        }});
    }
}
