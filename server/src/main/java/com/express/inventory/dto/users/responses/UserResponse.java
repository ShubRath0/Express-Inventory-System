package com.express.inventory.dto.users.responses;

import com.express.inventory.models.Role;
import com.express.inventory.models.UserEntity;
import lombok.Builder;

@Builder
public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        Role role
) {
    public static UserResponse from(UserEntity user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}