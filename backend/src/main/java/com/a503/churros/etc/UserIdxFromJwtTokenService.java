package com.a503.churros.etc;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class UserIdxFromJwtTokenService {

    private  String secretKey = "ewfkjasjfklawelfaefiefjelafjlalfialfesfsfdfefsefsefsefsedfsedfsefaefasefaefaefasefaefaesfaesfasefaefaefaweggerhrthrthdrtgrsgsrgsrgsgrsgrfgsrfsrfser";

    public Long extractIdxFromToken(String accessToken){


        Jws<Claims> jws = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(accessToken);
        Long userIdx = Long.parseLong( jws.getBody().get("sub",String.class));

        return userIdx;
    }


    public boolean isTokenValidate(String accessToken){
        try {

            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(accessToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException ex) {
            log.error("1. 잘못된 JWT 서명입니다.");

        } catch (MalformedJwtException ex) {
            log.error("2. 잘못된 JWT 서명입니다.");

        } catch (ExpiredJwtException ex) {
            log.error("3. 만료된 JWT 토큰입니다.");

        } catch (UnsupportedJwtException ex) {
            log.error("4. 지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException ex) {
            log.error("5. JWT 토큰이 잘못되었습니다.");
        }catch(Exception ex){
            log.error("6. JWT 토큰이 잘못되었습니다. ");
        }
        return false;
    }
}
