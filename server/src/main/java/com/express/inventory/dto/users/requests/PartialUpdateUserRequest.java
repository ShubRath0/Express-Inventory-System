package com.express.inventory.dto.users.requests;

public record PartialUpdateUserRequest(
        String username,
        String password
) {}