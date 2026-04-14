package com.express.inventory.api.users.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
        @NotBlank(message = "Username is required") String username,

        @NotBlank(message = "Password is required") String password) {
}