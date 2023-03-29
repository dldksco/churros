package com.a503.churros.controller.user;

import com.a503.churros.etc.UserIdxFromJwtTokenService;
import com.a503.churros.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {


    private final UserService userService;
    private final UserIdxFromJwtTokenService userIdxFromJwtTokenService;
    @GetMapping("")
    public ResponseEntity<?> myPage(@RequestHeader("token") String token){
//        log.info(userPrincipal.toString());
        // 서비스에서 가져오도록
        if(userIdxFromJwtTokenService.isTokenValidate(token)){
        return ResponseEntity.ok().body(userService.myPage(userIdxFromJwtTokenService.extractIdxFromToken(token)));

        }else{
            return ResponseEntity.ok().body(new HashMap<String,String>(){{
                put("fail", "유효하지 않은 토큰입니다.");
            }});
        }

    }

}
