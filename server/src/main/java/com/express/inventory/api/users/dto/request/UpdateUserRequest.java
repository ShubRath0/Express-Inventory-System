package com.express.inventory.api.users.dto.request;

public record UpdateUserRequest(
        String firstName,
        String lastName) {
}