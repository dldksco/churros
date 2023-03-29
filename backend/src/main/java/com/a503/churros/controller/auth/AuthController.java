package com.a503.churros.controller.auth;


import com.a503.churros.dto.auth.request.SignInRequest;
import com.a503.churros.dto.auth.request.SignUpRequest;
import com.a503.churros.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;





    @PostMapping("/signIn")
    public ResponseEntity<?> signin(@Valid @RequestBody SignInRequest signInRequest){

        return ResponseEntity.ok().body(authService.signin(signInRequest));
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest){

        return ResponseEntity.ok().body(authService.signup(signUpRequest));
    }

    @GetMapping("/kakao")
    public void KakaoAuthorize(HttpServletResponse response) throws IOException {



        authService.kakaoAuthorize(response);


    }

    @RequestMapping(value = "/kakao/callback", produces = "application/json", method = {RequestMethod.GET,
            RequestMethod.POST})
   public void KakaoCallBack(@RequestParam("code") String code, HttpServletResponse response) throws IOException {



        authService.kakaoCallBack(code,response);
   }












}
