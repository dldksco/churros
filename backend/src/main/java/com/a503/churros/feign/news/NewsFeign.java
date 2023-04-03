package com.a503.churros.feign.news;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@org.springframework.cloud.openfeign.FeignClient(name = "NewsFeign" , url = "${crs.uri}/recommend")
public interface NewsFeign {

    @GetMapping("/{userId}")
    List<Integer> getRecomList(@PathVariable("userId") long userId);

    @GetMapping("/sample")
    List<Integer> getSampleList();

}
