package com.a503.churros.config.security;

import com.a503.churros.config.security.advice.payload.ErrorCode;
import com.a503.churros.service.auth.CustomTokenProviderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Autowired
    private CustomTokenProviderService customTokenProviderService;
    private  String secretKey = "ewfkjasjfklawelfaefiefjelafjlalfialfesfsfdfefsefsefsefsedfsedfsefaefasefaefaefasefaefaesfaesfasefaefaefaweggerhrthrthdrtgrsgsrgsrgsgrsgrfgsrfsrfser";
    private String accessToken ;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String bearerToken = request.getHeader("Authorization");


        if(StringUtils.hasText(bearerToken)){
            accessToken = bearerToken.substring(7, bearerToken.length());
            try {

                Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(accessToken);
                log.info("호우오");
                UsernamePasswordAuthenticationToken authentication = customTokenProviderService.getAuthenticationById(accessToken);
                log.info("아앙앙");
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (io.jsonwebtoken.security.SecurityException ex) {
                log.error("1. 잘못된 JWT 서명입니다.");
                setErrorResponse(response, ErrorCode.INVALID_TOKEN);
                return;
            } catch (MalformedJwtException ex) {
                log.error("2. 잘못된 JWT 서명입니다.");
                setErrorResponse(response, ErrorCode.INVALID_TOKEN);
                return;
            } catch (ExpiredJwtException ex) {
                log.error("3. 만료된 JWT 토큰입니다.");
                setErrorResponse(response, ErrorCode.TOKEN_EXPIRED);
                return;
            } catch (UnsupportedJwtException ex) {
                log.error("4. 지원되지 않는 JWT 토큰입니다.");
                setErrorResponse(response, ErrorCode.INVALID_TOKEN);
                return;
            } catch (IllegalArgumentException ex) {
                log.error("5. JWT 토큰이 잘못되었습니다.");
                setErrorResponse(response, ErrorCode.INVALID_TOKEN);
                return;
            }catch(Exception ex){
                log.error("6. JWT 토큰이 잘못되었습니다. ");

                setErrorResponse(response, ErrorCode.INVALID_TOKEN);
                return;
            }


        }
        filterChain.doFilter(request, response);

//        try{
//            filterChain.doFilter(request, response);
//        }catch(ExpiredJwtException e){
//            //토큰의 유효기간 만료
//            setErrorResponse(response, ErrorCode.TOKEN_EXPIRED);
//        }catch (JwtException | IllegalArgumentException e){
//            //유효하지 않은 토큰
//            setErrorResponse(response, ErrorCode.INVALID_TOKEN);
//        }catch(IOException e){
//
//        }
    }


    private void setErrorResponse(
            HttpServletResponse response,
            ErrorCode errorCode
    ){
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(500);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getStatus(), errorCode.getMessage());
        try{


            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        }
        catch (IOException e){

            e.printStackTrace();
        }
        catch (Exception e){

            e.printStackTrace();
        }

    }

    @Data
    public static class ErrorResponse{
        private final Integer code;
        private final String message;
    }
}
