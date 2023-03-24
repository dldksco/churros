package com.a503.churros.controller.user;

import com.a503.churros.config.security.CurrentUser;
import com.a503.churros.config.security.UserPrincipal;
import com.a503.churros.entity.user.User;
import com.a503.churros.repository.user.UserRepository;
import com.a503.churros.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<?> myPage(@CurrentUser UserPrincipal userPrincipal){
//        log.info(userPrincipal.toString());
        // 서비스에서 가져오도록


        return ResponseEntity.ok().body(userService.myPage(userPrincipal));
    }

}
