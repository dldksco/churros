package com.a503.churros.controller.user;

import com.a503.churros.config.security.CurrentUser;
import com.a503.churros.config.security.UserPrincipal;
import com.a503.churros.service.auth.UserIdxFromJwtTokenService;
import com.a503.churros.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {


    private final UserService userService;
    private final UserIdxFromJwtTokenService userIdxFromJwtTokenService;
    @GetMapping("")
    public ResponseEntity<?> myPage(@RequestHeader("Authorization") String token) throws Exception {

        // 서비스에서 가져오도록

        return ResponseEntity.ok().body(userService.myPage(userIdxFromJwtTokenService.extractIdxFromToken(token)));



    }



}
