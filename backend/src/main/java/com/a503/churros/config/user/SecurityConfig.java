package com.a503.churros.config.user;

import com.a503.churros.service.user.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomUserDetailsService customUserDetailsService;
//    private final CustomDefaultOAuth2UserService customOAuth2UserService;
//    private final CustomSimpleUrlAuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
//    private final CustomSimpleUrlAuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
//    private final CustomAuthorizationRequestRepository customAuthorizationRequestRepository;

    @Bean
    public CustomOncePerRequestFilter customOncePerRequestFilter() {
        return new CustomOncePerRequestFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf()
                .disable()
                .formLogin()
                .disable()
                .httpBasic()
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()
                .authorizeRequests()
                .antMatchers("/", "/error", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html", "/**/*.css", "/**/*.js")
                .permitAll()
                .antMatchers("/swagger", "/swagger-ui.html", "/swagger-ui/**", "/api-docs", "/api-docs/**", "/v3/api-docs/**")
                .permitAll()
                .antMatchers("/user/**", "/auth/**", "/oauth2/**")
                .permitAll()
                .antMatchers("/news/**","/scrap/**","/recommend/**")
                .permitAll()
                .anyRequest()
                .authenticated();


//                .and()
//                .oauth2Login()
//                .authorizationEndpoint()
//                .baseUri("/oauth2/authorize")
//                .authorizationRequestRepository(customAuthorizationRequestRepository)
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/oauth2/callback/*")
//                .and()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService)
//                .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureHandler(oAuth2AuthenticationFailureHandler);


        http.addFilterBefore(customOncePerRequestFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
