package com.express.inventory.api.purchases.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotNull;

public record PurchaseOrderResponse(
        @NotNull Integer id,
        @NotNull Integer userId,
        @NotNull List<PurchaseOrderRecordDTO> records,
        @NotNull String orderStatus,
        @NotNull BigDecimal orderPrice,
        @NotNull BigDecimal totalQuantity,
        @NotNull LocalDateTime createdAt,
        @NotNull LocalDateTime updatedAt) {
}
