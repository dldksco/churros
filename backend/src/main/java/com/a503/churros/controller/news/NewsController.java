package com.a503.churros.controller.news;

import com.a503.churros.service.news.NewsService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/news")
@Api("NEWS API")
@RequiredArgsConstructor
public class NewsController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final NewsService ns;

    @GetMapping("/")
    public ResponseEntity<?> getNews(
//            String token
            long userId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        // 토큰을 통해 유저 인덱스를 가져오기 - 구현 전
        List<String> list = ns.sendRecommend(1);

        resultMap.put("result", SUCCESS);

        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }


}
