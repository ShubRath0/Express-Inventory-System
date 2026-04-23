package com.express.inventory.api.notifications;

import jakarta.validation.constraints.NotNull;

public record NotificationDTO(
        @NotNull Integer id,
        @NotNull String message,
        @NotNull String type,
        @NotNull boolean isRead) {
}