package com.express.inventory.dto.users.requests;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank String username,
        @NotBlank String password
) {}