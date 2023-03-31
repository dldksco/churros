package com.a503.churros.controller.test;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.dto.scrap.ScrapFolderDTO;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
@Api("TEST API")
@RequiredArgsConstructor
@CrossOrigin
public class TestController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/scrap")
    public ResponseEntity<?> getScrap(){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<ScrapFolderDTO> folderList = new ArrayList<>();
        folderList.add(new ScrapFolderDTO(1 , "정치"));
        folderList.add(new ScrapFolderDTO(2 , "사회"));
        folderList.add(new ScrapFolderDTO(3 , "IT"));
        folderList.add(new ScrapFolderDTO(4 , "힐링"));
        folderList.add(new ScrapFolderDTO(5 , "윤석열"));
        resultMap.put("result", SUCCESS);
        resultMap.put("empty" , true);
        resultMap.put("folder" , folderList);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/scrap/{scrapbookId}")
    public ResponseEntity<?> getScrap(
            @PathVariable(value = "scrapbookId") long scrapbookId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<Long> articleList = new ArrayList<>();
        articleList.add(1L);
        articleList.add(2L);
        articleList.add(3L);
        articleList.add(4L);
        articleList.add(5L);
        articleList.add(11L);
        articleList.add(21L);
        articleList.add(31L);
        articleList.add(41L);
        articleList.add(51L);
        resultMap.put("empty" , true);
        resultMap.put("articles" , articleList);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PostMapping("/scrap/book")
    public ResponseEntity<?> postScrapBook(
            String folderName
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("folderIdx" , 123);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/scrap/book")
    public ResponseEntity<?> putScrapBooK(
            String folderName ,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @DeleteMapping("/scrap/book")
    public ResponseEntity<?> deleteScrapBook(
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/scrap/article")
    public ResponseEntity<?> putScrapArticle(
            long folderIdx ,
            long articleIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/news")
    public ResponseEntity<?> getNews(
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<Long> list = new ArrayList<>();
        list.add(1L);
        list.add(11L);
        list.add(111L);
        list.add(1111L);
        list.add(122L);
        list.add(1L);
        list.add(11L);
        list.add(111L);
        list.add(1111L);
        list.add(122L);
        list.add(13L);
        list.add(13L);
        resultMap.put("articles", list);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/news/{articleId}")
    public ResponseEntity<?> getNewsArti(
            @PathVariable(value = "articleId") long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        ArticleDTO dto = new ArticleDTO(1L , "윤석열 대통령? 와!" , "와 대통령이다! 아이들이 대통령을 지켜보고 있다",
                "https://n.news.naver.com/article/053/0000035232",
                "https://imgnews.pstatic.net/image/053/2023/03/24/0000035232_001_20230324132101110.gif?type=w647",
                "1994-03-08",
                false);

        resultMap.put("result", SUCCESS);
        resultMap.put("article" , dto);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/news/sample")
    public ResponseEntity<?> getNewsSample(
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        List<Long> list = new ArrayList<>();
        list.add(1L);
        list.add(11L);
        list.add(111L);
        list.add(1111L);
        list.add(122L);
        list.add(13L);
        resultMap.put("result", SUCCESS);
        resultMap.put("articles", list);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/news/read")
    public ResponseEntity<?> putRead(
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/news/like")
    public ResponseEntity<?> postLike(
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/news/like")
    public ResponseEntity<?> getLike(
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        List<Long> list = new ArrayList<>();
        list.add(1L);
        list.add(11L);
        list.add(111L);
        list.add(1111L);
        list.add(122L);
        list.add(13L);
        resultMap.put("articles" , list);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
    @PostMapping("/news/dislike")
    public ResponseEntity<?> postDisLike(
            long articleId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/auth/kakao")
    public ResponseEntity<?> getKakao(
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/auth/kakao/{code}")
    public ResponseEntity<?> getKakaoCode(
            @PathVariable(value = "code") long code
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

}
