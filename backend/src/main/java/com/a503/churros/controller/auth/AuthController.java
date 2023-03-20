package com.a503.churros.controller.auth;


import com.a503.churros.config.security.CurrentUser;
import com.a503.churros.config.security.UserPrincipal;
import com.a503.churros.dto.auth.request.SignInRequest;
import com.a503.churros.dto.auth.request.SignUpRequest;
import com.a503.churros.entity.user.User;
import com.a503.churros.repository.user.UserRepository;
import com.a503.churros.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final AuthService userService;


    @PostMapping("/signIn")
    public ResponseEntity<?> signin(@Valid @RequestBody SignInRequest signInRequest){

        return userService.signin(signInRequest);
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest){

        return userService.signup(signUpRequest);
    }






}
