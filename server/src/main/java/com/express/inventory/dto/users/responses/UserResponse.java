package com.express.inventory.dto.users.responses;

import com.express.inventory.models.UserEntity;

public record UserResponse(
        Long id,
        String username
) {
    public static UserResponse from(UserEntity user) {
        return new UserResponse(
                user.getId(),
                user.getUsername()
        );
    }
}
