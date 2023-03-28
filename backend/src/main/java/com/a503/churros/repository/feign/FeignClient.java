package com.a503.churros.repository.feign;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@org.springframework.cloud.openfeign.FeignClient(name = "FeignClient" , url = "http://localhost:8080/recommend")
public interface FeignClient {

    @GetMapping("/{userId}")
    List<Long> getRecomList(@PathVariable("userId") long userId);

    @GetMapping("/sample")
    List<Long> getSampleList();

}
