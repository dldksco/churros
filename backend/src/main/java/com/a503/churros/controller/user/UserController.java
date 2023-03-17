package com.a503.churros.controller.user;


import com.a503.churros.config.user.CurrentUser;
import com.a503.churros.config.user.UserPrincipal;
import com.a503.churros.entity.user.User;
import com.a503.churros.dto.user.request.SignInRequest;
import com.a503.churros.dto.user.request.SignUpRequest;
import com.a503.churros.repository.user.UserRepository;
import com.a503.churros.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/signIn")
    public ResponseEntity<?> signin(@Valid @RequestBody SignInRequest signInRequest){

        return userService.signin(signInRequest);
    }

    @PostMapping("/signUp")
    public ResponseEntity<Void> signUp(@Valid @RequestBody SignUpRequest signUpRequest){
        userService.signup(signUpRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



    @GetMapping("/aaa")
    public ResponseEntity<?> aaa(@CurrentUser UserPrincipal userPrincipal){
        log.info(userPrincipal.toString());
        Optional<User> user = userRepository.findById(userPrincipal.getId());
        return ResponseEntity.ok(user);
    }
}
