package com.a503.churros.feign.news;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "entertain", url = "https://entertain.naver.com")
public interface EnterFeign {

    @RequestMapping(method = RequestMethod.GET, value = "/{articleId}")
    String getArticle(@PathVariable("articleId") String articleId);
}