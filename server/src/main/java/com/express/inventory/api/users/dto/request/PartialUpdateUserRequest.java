package com.express.inventory.api.users.dto.request;

public record PartialUpdateUserRequest(
        String username,
        String password) {
}