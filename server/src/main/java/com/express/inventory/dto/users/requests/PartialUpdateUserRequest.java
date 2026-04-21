package com.express.inventory.dto.users.requests;
import com.express.inventory.models.Role;
public record PartialUpdateUserRequest(
        String firstName,
        String lastName,
        String email,
        String password,
        Role role
) {}