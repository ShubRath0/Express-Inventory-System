package com.express.inventory.api.notifications;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.logs.InventoryTransaction;
import com.express.inventory.api.logs.InventoryTransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final InventoryTransactionService inventoryLogService;

    public List<NotificationDTO> getNotifications() {
        return inventoryLogService.getRecentLogs()
                .stream()
                .map(log -> {
                    NotificationDTO dto = new NotificationDTO(log.getId(), buildMessage(log), "INFO", false);
                    return dto;
                })
                .toList();
    }

    private String buildMessage(InventoryTransaction log) {
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
