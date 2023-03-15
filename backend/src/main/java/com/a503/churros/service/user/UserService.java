package com.a503.churros.service.user;

import com.a503.churros.entity.user.Token;
import com.a503.churros.entity.user.User;
import com.a503.churros.entity.user.mapping.TokenMapping;
import com.a503.churros.dto.user.request.SignInRequest;
import com.a503.churros.dto.user.request.SignUpRequest;
import com.a503.churros.dto.user.response.AuthResponse;
import com.a503.churros.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    private final CustomTokenProviderService customTokenProviderService;
    public ResponseEntity<?> signin(SignInRequest signInRequest){
        // 인증과정
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getEmail(),
                        signInRequest.getPassword()
                )
        );
        // SecurityContextHolder는 Spring Security에서 사용되는 보안 관련 정보를 저장하는 객체 (주석처리 해도 수행은 되는데?)
        SecurityContextHolder.getContext().setAuthentication(authentication);

//        log.info(SecurityContextHolder.getContext().getAuthentication().toString());


        // 토큰 만드는 과정 customTokenProviderService에서 refreshToken 과 accessToken을 만들어 낸다.
        TokenMapping tokenMapping = customTokenProviderService.createToken(authentication);

        // 얘는 DB refreshToken-table 에 저장될 것
        Token token = Token.builder()
                .refreshToken(tokenMapping.getRefreshToken())
                .userEmail(tokenMapping.getUserEmail())
                .build();
        // mariadb database에 refreshToken 저장
//        tokenRepository.save(token);

        // 로그인 할때, 액세스토큰과 , 리프레시토큰을 반환
        AuthResponse authResponse = AuthResponse.builder().accessToken(tokenMapping.getAccessToken()).refreshToken(token.getRefreshToken()).build();

        return ResponseEntity.ok(authResponse);
    }

    public void signup(SignUpRequest signUpRequest){
//        DefaultAssert.isTrue(!userRepository.existsByEmail(signUpRequest.getEmail()), "해당 이메일이 존재하지 않습니다.");

        User user = User.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .provider(1)
                .roles(1)
                .build();

        userRepository.save(user);

//        URI location = ServletUriComponentsBuilder
//                .fromCurrentContextPath().path("/auth/")
//                .buildAndExpand(user.getId()).toUri();
//        ApiResponse apiResponse = ApiResponse.builder().check(true).information(Message.builder().message("회원가입에 성공하였습니다.").build()).build();

//        return ResponseEntity.created(location).body(apiResponse);
        return;
    }
}
