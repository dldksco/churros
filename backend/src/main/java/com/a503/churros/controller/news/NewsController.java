package com.a503.churros.controller.news;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.service.news.NewsService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//            @RequestHeader("token")
//            String token
            long userId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        // 토큰을 통해 유저 인덱스를 가져오기 - 구현 전
        List<Long> list = ns.sendRecommend(userId);

        resultMap.put("articles", list);
        resultMap.put("result", SUCCESS);

        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<?> getNewsArti(
//            @RequestHeader("token")
//            String token
            long userId,
            @PathVariable(value = "articleId") long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        // mongoDb와 연결해서 기사 정보를 가져오기
//        ArticleDTO dto = ns.getArticleInfo(userId , articleId);
        // DTO 와 ENTITY 만들기

        resultMap.put("result", SUCCESS);
//        resultMap.put("article" , dto);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/sample")
    public ResponseEntity<?> getNewsSample(
//            @RequestHeader("token")
//            String token
            long userId,
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        List<Long> list = ns.sendSample();
        resultMap.put("result", SUCCESS);
        resultMap.put("articles", list);

        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/read")
    public ResponseEntity<?> putRead(
//            @RequestHeader("token")
//            String token
            long userId,
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        ns.saveReadArti(userId , articleId);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<?> postLike(
//            @RequestHeader("token")
//            String token
            long userId,
            long articleId,
            long like
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        ns.recordLike(userId , articleId , like);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/like")
    public ResponseEntity<?> getLike(
//            @RequestHeader("token")
//            String token
            long userId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        List<Long> list = ns.getLikeList(userId);

        resultMap.put("articles" , list);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
    @PostMapping("/dislike")
    public ResponseEntity<?> postDisLike(
//            @RequestHeader("token")
//            String token
            long userId,
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        ns.recordDisLike(userId , articleId);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }


}
