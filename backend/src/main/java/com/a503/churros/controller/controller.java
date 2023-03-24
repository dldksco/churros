package com.a503.churros.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {





//  @Value("${es.host}")
//  String h;
//
  @GetMapping("/test")
  public String hi() {
    String h = "test";
    System.out.println("ggggg");
    return h;
  }

}
