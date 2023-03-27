package com.a503.churros.controller.scrap;


import com.a503.churros.dto.scrap.ScrapFolderDTO;
import com.a503.churros.service.scrap.ScrapService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scrap")
@Api("SCRAP API")
@RequiredArgsConstructor
public class ScrapController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ScrapService ss;


    @GetMapping("")
    public ResponseEntity<?> getScrap(
//            @RequestHeader("token")
//            String token
            long userId
    ){

        Map<String, Object> resultMap = new HashMap<String, Object>();

        // 토큰을 통해 유저 인덱스를 가져오기 - 구현 전
        List<ScrapFolderDTO> folderList
                = ss.getFolderList(userId);

        if(folderList == null){
            resultMap.put("empty" , true);
        }else{
            resultMap.put("empty" , false);
            resultMap.put("folder" , folderList);
        }
        resultMap.put("result", SUCCESS);

        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @GetMapping("/{scrapbookId}")
    public ResponseEntity<?> getScrap(
//            @RequestHeader("token")
//            String token
            long userId ,
            @PathVariable(value = "scrapbookId") long scrapbookId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        // 토큰을 통해 유저 인덱스를 가져오기 - 구현 전
        List<Long> articleList = ss.getArticleList(userId, userId);
        if(articleList == null){
            resultMap.put("empty" , true);
        }else {
            resultMap.put("empty", false);
            resultMap.put("articles" , articleList);
        }
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<?> postScrapBook(
//            @RequestHeader("token")
//            String token
            long userId ,
            String folderName
            ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        // 토큰을 통해 유저 인덱스를 가져오기 - 구현 전

        long folderIdx = ss.insertFolderName(userId , folderName);

        resultMap.put("folderIdx" , folderIdx);
        resultMap.put("result", SUCCESS);

        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
    @PutMapping("/book")
    public ResponseEntity<?> putScrapBooK(
//            @RequestHeader("token")
//            String token
            long userId ,
            String folderName ,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        ss.changeFolderName(userId , folderName , folderIdx);
        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @DeleteMapping("/book")
    public ResponseEntity<?> deleteScrapBook(
//            @RequestHeader("token")
//            String token
            long userId ,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        ss.deleteFolder(userId , folderIdx);

        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }

    @PutMapping("/article")
    public ResponseEntity<?> putScrapArticle(
//            @RequestHeader("token")
//            String token
            long userId ,
            long folderIdx ,
            long articleIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();

        ss.saveArticle(userId , folderIdx , articleIdx);


        resultMap.put("result", SUCCESS);
        return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
    }
}
