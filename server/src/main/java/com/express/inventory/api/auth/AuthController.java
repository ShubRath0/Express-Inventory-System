package com.express.inventory.api.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.auth.dto.request.LoginRequest;
import com.express.inventory.api.users.dto.response.UserDTO;
import com.express.inventory.common.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDTO>> login(@Valid @RequestBody LoginRequest request) {
        UserDTO user = authService.login(request);
        return ApiResponse.success(HttpStatus.OK, "Log in successful", user);
    }
}
