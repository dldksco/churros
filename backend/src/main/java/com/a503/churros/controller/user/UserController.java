package com.a503.churros.controller.user;

import com.a503.churros.etc.UserIdxFromJwtTokenService;
import com.a503.churros.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {


    private final UserService userService;
    private final UserIdxFromJwtTokenService userIdxFromJwtTokenService;
    @GetMapping("")
    public ResponseEntity<?> myPage(@RequestHeader("token") String token) throws Exception {
//        log.info(userPrincipal.toString());
        // 서비스에서 가져오도록

        return ResponseEntity.ok().body(userService.myPage(userIdxFromJwtTokenService.extractIdxFromToken(token)));



    }



}
