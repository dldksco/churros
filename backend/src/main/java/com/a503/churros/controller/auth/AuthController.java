package com.a503.churros.controller.auth;


import com.a503.churros.config.security.CurrentUser;
import com.a503.churros.config.security.UserPrincipal;
import com.a503.churros.dto.auth.request.SignInRequest;
import com.a503.churros.dto.auth.request.SignUpRequest;
import com.a503.churros.entity.user.User;
import com.a503.churros.repository.user.UserRepository;
import com.a503.churros.service.auth.AuthService;
import com.a503.churros.service.auth.GetKakaoInfo;
import com.a503.churros.service.auth.GetKakaoToken;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    private final GetKakaoToken getKakaoToken;

    private final GetKakaoInfo getKakaoInfo;

    private static String CLIENT_ID = "1a06069f5798412103d829ce3ec3a3a0";
    private static String CLIENT_SECRET = "eKmMwAle5wR5XRqWdZDCXpybrhiaZsti";

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

        String url = "https://kauth.kakao.com/oauth/authorize?client_id="+CLIENT_ID
                +"&redirect_uri=http://localhost:9999/auth/kakao/callback&response_type=code";
        // step1 :  1번 oauth/authorize 보내  , 2번은 Kakao Auth Server , 3번은 Client , 4번은 KakaoAuthServer ,5번은 Client
        response.sendRedirect(url);


    }

    @RequestMapping(value = "/kakao/callback", produces = "application/json", method = {RequestMethod.GET,
            RequestMethod.POST})
   public void KakaoCallBack(@RequestParam("code") String code, HttpServletResponse response) throws IOException {

        // step2 : 토큰받기


        JSONObject accessTokenKakao =  getKakaoToken.getKakaoToken("authorization_code",CLIENT_ID,
                "http://localhost:9999/auth/kakao/callback",code);
        JSONObject resp = getKakaoInfo.getKakaoInfo((String)accessTokenKakao.get("token_type")+" "+(String)accessTokenKakao.get("access_token"));
        //  회원 가입
        Optional<User> user = authService.kakaoSignup(resp);

        // 토큰 생성
        String[] tokens = createJWTToken(user);
        response.sendRedirect("http://localhost:3000/kakao/handler?access-token="+tokens[0]+"&refresh-token="+tokens[1]);

   }





    private String[] createJWTToken(Optional<User> user){
        Date now = new Date();
        // 좀 찍어보자
        Date accessTokenExpiresIn = new Date(now.getTime() + 20000000);
        Date refreshTokenExpiresIn = new Date(now.getTime() + 600000000);
        String secretKey = "ewfkjasjfklawelfaefiefjelafjlalfialfesfsfdfefsefsefsefsedfsedfsefaefasefaefaefasefaefaesfaesfasefaefaefaweggerhrthrthdrtgrsgsrgsrgsgrsgrfgsrfsrfser";
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        // sub 엔 유저 id, iat엔 시작시점, exp 엔 만료되는 시점
        String accessToken = Jwts.builder()
                .setSubject(Long.toString(user.get().getId()))
                .setIssuedAt(new Date())
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        // refreshtoken엔 exp 만료되는 시점만 , 추후 변경 가능
        String refreshToken = Jwts.builder()
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        String[] tokens = new String[2];
        tokens[0] = accessToken;
        tokens[1] = refreshToken;
        return tokens;
    }






}
