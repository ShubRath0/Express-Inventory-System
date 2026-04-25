package com.express.inventory.api.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.auth.dto.request.LoginRequest;
import com.express.inventory.api.auth.dto.response.LoginResponse;
import com.express.inventory.api.users.User;
import com.express.inventory.common.dto.ApiResponse;
import com.express.inventory.common.dto.RegisterUserDto;
import com.express.inventory.common.security.JWTService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final JWTService jwtService;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<User>> register(
        @Valid @RequestBody RegisterUserDto registerUserDto
    ) {
        User registeredUser = authService.signup(registerUserDto);
        return ApiResponse.success(HttpStatus.OK, "User registered successfully", registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginUserDto) {
        User authenticatedUser = authService.login(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ApiResponse.success(HttpStatus.OK, "Log in successful", loginResponse);
    }
}
