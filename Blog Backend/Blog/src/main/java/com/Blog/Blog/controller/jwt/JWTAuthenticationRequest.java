package com.Blog.Blog.controller.jwt;

import lombok.Data;

@Data
public class JWTAuthenticationRequest {
    private String userName;
    private String password;

    public JWTAuthenticationRequest(String userName, String password) {
        this.userName = userName;
          this.password = password;
    }
}