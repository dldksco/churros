package com.a503.churros.repository.feign;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@org.springframework.cloud.openfeign.FeignClient(name = "client" , url = "http://localhost:8080")
public interface FeignClient {

    @GetMapping("/recommend/{userId}")
    List<Long> getRecomList(@PathVariable("userId") long userId);

    @GetMapping("/sample")
    List<Long> getSampleList();

}
