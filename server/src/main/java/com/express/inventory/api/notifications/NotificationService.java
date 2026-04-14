package com.express.inventory.api.notifications;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.logs.InventoryLogEntity;
import com.express.inventory.api.logs.InventoryLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final InventoryLogService inventoryLogService;

    public List<NotificationDTO> getNotifications() {
        return inventoryLogService.getRecentLogs()
                .stream()
                .map(log -> {
                    NotificationDTO dto = new NotificationDTO(log.getLogId(), buildMessage(log), "INFO", false);
                    return dto;
                })
                .toList();
    }

    private String buildMessage(InventoryLogEntity log) {
        String action = log.getActionType().name();
        String note = log.getNote();

        if ("Product is low in stock".equals(note)) {
            return "Low stock alert";
        }

        switch (action) {
            case "ADD":
                return "Product added";
            case "DELETE":
                return "Product deleted";
            case "UPDATE":
                return "Product updated";
            default:
                return "Inventory activity";
        }
    }
}
