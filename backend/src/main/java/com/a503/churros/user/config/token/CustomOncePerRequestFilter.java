package com.a503.churros.user.config.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.a503.churros.user.advice.payload.ErrorCode;
import com.a503.churros.user.service.CustomTokenProviderService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class CustomOncePerRequestFilter extends OncePerRequestFilter{

    @Autowired
    private CustomTokenProviderService customTokenProviderService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJwtFromRequest(request);

        if (StringUtils.hasText(jwt) && customTokenProviderService.validateToken(jwt)) {
            try{
                UsernamePasswordAuthenticationToken authentication = customTokenProviderService.getAuthenticationById(jwt);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }catch(ExpiredJwtException e){
                setErrorResponse(response, ErrorCode.TOKEN_EXPIRED);
                return;
            }

        }

        filterChain.doFilter(request, response);
    }

    private void setErrorResponse(
            HttpServletResponse response,
            ErrorCode errorCode
    ){
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(errorCode.getStatus());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getStatus(), errorCode.getMessage());
        try{
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    @Data
    public static class ErrorResponse{
        private final Integer code;
        private final String message;
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            log.info("bearerToken = {}", bearerToken.substring(7, bearerToken.length()));
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    
}
