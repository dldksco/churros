package com.a503.churros.controller.news;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.global.exception.CustomExceptionHandler;
import com.a503.churros.service.news.NewsService;
import com.a503.churros.service.user.UserIdxFromJwtTokenService;
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
@CrossOrigin("*")
public class NewsController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final NewsService ns;
    private final UserIdxFromJwtTokenService ts;

    @GetMapping("")
    public ResponseEntity<?> getNews(
            @RequestHeader("Authorization")
            String token
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
            List<Integer> list = ns.sendRecommend(userId);
            resultMap.put("articles", list);
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<?> getNewsArti(
            @RequestHeader("Authorization")
                    String token,
            @PathVariable(value = "articleId") long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
            ArticleDTO dto = ns.getArticleInfo(/*userId , */articleId);
            resultMap.put("result", SUCCESS);
            resultMap.put("article" , dto);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/call")
    public ResponseEntity<?> getNewsHtml(
            String url
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String html = ns.callNaver(url);
        resultMap.put("result", SUCCESS);
        resultMap.put("html" , html);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/sample")
    public ResponseEntity<?> getNewsSample(){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<Integer> list = ns.sendSample();
        resultMap.put("result", SUCCESS);
        resultMap.put("articles", list);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/read")
    public ResponseEntity<?> putRead(
            @RequestHeader("authorization")
            String token,
            int articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        ns.saveReadArti(userId , articleId);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);

    }

    @PutMapping("/like")
    public ResponseEntity<?> postLike(
            @RequestHeader("Authorization")
            String token,
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        ns.recordLike(userId , articleId);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/like")
    public ResponseEntity<?> getLike(
            @RequestHeader("Authorization")
            String token
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        List<Long> list = ns.getLikeList(userId);
        resultMap.put("articles" , list);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
    @PostMapping("/dislike")
    public ResponseEntity<?> postDisLike(
            @RequestHeader("Authorization")
            String token,
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        ns.recordDisLike(userId , articleId);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
}
