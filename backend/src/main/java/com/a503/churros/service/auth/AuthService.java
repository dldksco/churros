package com.a503.churros.service.auth;


import com.a503.churros.dto.auth.request.SignInRequest;
import com.a503.churros.dto.auth.request.SignUpRequest;
import com.a503.churros.dto.auth.response.AuthResponse;
import com.a503.churros.dto.auth.response.MessageResponse;
import com.a503.churros.entity.user.User;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface AuthService {

    public AuthResponse signin(SignInRequest signInRequest);
    public MessageResponse signup(SignUpRequest signUpRequest);

    public Optional<User> kakaoSignup(JSONObject resp);



}
