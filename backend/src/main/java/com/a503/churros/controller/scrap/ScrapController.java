package com.a503.churros.controller.scrap;


import com.a503.churros.dto.scrap.ScrapFolderDTO;
import com.a503.churros.service.scrap.ScrapService;
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
@RequestMapping("/scrap")
@Api("SCRAP API")
@RequiredArgsConstructor
public class ScrapController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ScrapService ss;
    private final UserIdxFromJwtTokenService ts;

    @GetMapping("")
    public ResponseEntity<?> getScrap(
            @RequestHeader("token")
            String token
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        try{
            List<ScrapFolderDTO> folderList = ss.getFolderList(userId);
            if(folderList == null){
                resultMap.put("empty" , true);
            }else{
                resultMap.put("empty" , false);
                resultMap.put("folder" , folderList);
            }
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
        }catch (Exception e){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // 토큰을 통해 유저 인덱스를 가져오기 - 구현 전
    }

    @GetMapping("/{scrapbookId}")
    public ResponseEntity<?> getScrap(
            @RequestHeader("token")
            String token,
            @PathVariable(value = "scrapbookId") long scrapbookId
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        try{
            List<Long> articleList = ss.getArticleList(userId, userId);
            if(articleList == null){
                resultMap.put("empty" , true);
            }else {
                resultMap.put("empty", false);
                resultMap.put("articles" , articleList);
            }
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
        }catch (Exception e){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/book")
    public ResponseEntity<?> postScrapBook(
            @RequestHeader("token")
            String token,
            String folderName
            ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        try{
            long folderIdx = ss.insertFolderName(userId , folderName);
            resultMap.put("folderIdx" , folderIdx);
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
        }catch (Exception e){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/book")
    public ResponseEntity<?> putScrapBooK(
            @RequestHeader("token")
            String token,
            String folderName ,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        try{
            ss.changeFolderName(userId , folderName , folderIdx);
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
        }catch (Exception e){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/book")
    public ResponseEntity<?> deleteScrapBook(
            @RequestHeader("token")
            String token,
            long folderIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        try{
            ss.deleteFolder(userId , folderIdx);
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
        }catch (Exception e){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/article")
    public ResponseEntity<?> putScrapArticle(
            @RequestHeader("token")
            String token,
            long folderIdx ,
            long articleIdx
    ){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        long userId = ts.extractIdxFromToken(token);
        try{
            ss.saveArticle(userId , folderIdx , articleIdx);
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.OK);
        }catch (Exception e){
            resultMap.put("result", FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
