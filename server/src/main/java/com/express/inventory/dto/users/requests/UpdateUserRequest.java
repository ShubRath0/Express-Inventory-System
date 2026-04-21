package com.express.inventory.dto.users.requests;

import jakarta.validation.constraints.NotBlank;
import com.express.inventory.models.Role;
public record UpdateUserRequest(
        String firstName,
        String lastName,
        String email,
        String password,
        Role role
) {}