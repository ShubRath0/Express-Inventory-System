package com.express.inventory.api.users.dto.response;

import com.express.inventory.api.users.enums.Role;

import jakarta.validation.constraints.NotNull;

public record UserDTO(
        @NotNull Long id,
        @NotNull String firstName,
        @NotNull String lastName,
        @NotNull String email,
        @NotNull Role role) {
}