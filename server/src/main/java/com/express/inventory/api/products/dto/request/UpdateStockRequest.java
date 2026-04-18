package com.express.inventory.api.products.dto.request;

import java.math.BigDecimal;

import com.express.inventory.api.logs.enums.InventoryActionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateStockRequest(
        @NotNull BigDecimal stockChange,
        @NotNull InventoryActionType actionType,
        @NotBlank String note) {
}
