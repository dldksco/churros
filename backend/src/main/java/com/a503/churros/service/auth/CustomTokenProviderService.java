package com.a503.churros.service.auth;

import com.a503.churros.config.security.OAuth2Config;
import com.a503.churros.config.security.UserPrincipal;
import com.a503.churros.entity.auth.mapping.TokenMapping;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;


public interface CustomTokenProviderService {

    public TokenMapping createToken(Authentication authentication);
    public boolean validateToken(String token);
    public Long getUserIdFromToken(String token);

    public UsernamePasswordAuthenticationToken getAuthenticationById(String token);

    public UsernamePasswordAuthenticationToken getAuthenticationByEmail(String email);

}
