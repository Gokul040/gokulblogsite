package com.Blog.Blog.security;


import com.Blog.Blog.controller.jwt.JWTAuthenticationFilter;
import com.Blog.Blog.serviceImpl.UserRegistrationDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRegistrationDetailsService userDetailsService;
    @Autowired
    private JWTAuthenticationFilter authenticationFilter;

    private static final String[] ADMIN_URLs = {"/register/**","/users/**","/authenticate/**","category/**","blog/**",};
    private static final String[] UN_SECURED_URLsa = {"register/forgotpassword","register/verify-account","register/regenerate-otp","register/verifyEmail","register/get-user/{email}","register/password-reset-request","/register/reset-password","/authenticate/**","blog/**","register/resend-verificationEmail",
            "register/verifyEmail","category/get-one-Category/{id}","category/get-all-Category","blog/get-blogs-category/{id}","blog/get-one-blog/{id}","blog/get-all-blog"};
    private static final String[] USER_URLs = {"register/get-user/{email}","register/update-profile","register/password-reset-request","/register/reset-password","/authenticate/**","category/**","blog/**"};

  @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         http.cors().and().csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(UN_SECURED_URLsa).permitAll()
                .requestMatchers(USER_URLs).hasAnyAuthority("USER","ADMIN")
                .requestMatchers(ADMIN_URLs).hasAnyAuthority("ADMIN")
                .anyRequest().authenticated()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
      return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        var authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }



}
