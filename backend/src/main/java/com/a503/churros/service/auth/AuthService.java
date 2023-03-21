package com.a503.churros.service.auth;


import com.a503.churros.dto.auth.request.SignInRequest;
import com.a503.churros.dto.auth.request.SignUpRequest;
import com.a503.churros.dto.auth.response.AuthResponse;
import com.a503.churros.dto.auth.response.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    public AuthResponse signin(SignInRequest signInRequest);
    public MessageResponse signup(SignUpRequest signUpRequest);

}
