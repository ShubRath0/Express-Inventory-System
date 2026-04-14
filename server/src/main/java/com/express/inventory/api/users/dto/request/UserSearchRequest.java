package com.express.inventory.api.users.dto.request;

public record UserSearchRequest(
        String email,
        String name) {
}