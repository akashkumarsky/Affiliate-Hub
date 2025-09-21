package com.amazon.affiliate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {

    // This endpoint is protected by our SecurityConfig.
    // If the request is successful, it means the user is authenticated.
    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(Principal principal) {
        // 'Principal' is automatically injected by Spring Security and contains the username.
        return ResponseEntity.ok(principal.getName());
    }
}