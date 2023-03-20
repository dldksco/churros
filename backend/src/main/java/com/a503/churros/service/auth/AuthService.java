package com.a503.churros.service.auth;


import com.a503.churros.dto.auth.request.SignInRequest;
import com.a503.churros.dto.auth.request.SignUpRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    public ResponseEntity<?> signin(SignInRequest signInRequest);
    public ResponseEntity<?> signup(SignUpRequest signUpRequest);

}
