package com.express.inventory.api.users.dto.response;

import com.express.inventory.api.users.User;

public record UserResponse(
        Long id,
        String username) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername());
    }
}