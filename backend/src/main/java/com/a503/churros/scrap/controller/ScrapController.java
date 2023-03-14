package com.a503.churros.scrap.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scrap")
@Api("SCRAP API")
@RequiredArgsConstructor
public class ScrapController {

    @GetMapping("/")
    public ResponseEntity<?> getScrap(){
        System.out.println("test3");
        return null;
    }
}
