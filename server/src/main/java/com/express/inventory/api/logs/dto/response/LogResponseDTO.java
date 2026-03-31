package com.express.inventory.api.logs.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.express.inventory.api.logs.InventoryLogEntity;

public record LogResponseDTO(
        Integer logId,
        String productName,
        BigDecimal initialStock,
        BigDecimal finalStock,
        BigDecimal adjustmentQuantity,
        String actionType,
        String note,
        LocalDateTime createdAt) {
    public static LogResponseDTO fromEntity(InventoryLogEntity entity) {
        return new LogResponseDTO(
                entity.getLogId(),
                entity.getProduct().getName(),
                entity.getInitialStock(),
                entity.getFinalStock(),
                entity.getAdjustmentQuantity(),
                entity.getActionType().toString(),
                entity.getNote(),
                entity.getCreatedAt());
    }
}
