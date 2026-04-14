package com.express.inventory.api.notifications;

public record NotificationDTO(
        Integer id,
        String message,
        String type,
        boolean isRead) {
}