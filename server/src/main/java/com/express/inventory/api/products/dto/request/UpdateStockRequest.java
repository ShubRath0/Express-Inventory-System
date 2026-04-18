package com.express.inventory.api.products.dto.request;

import java.math.BigDecimal;

import com.express.inventory.api.logs.enums.InventoryActionType;

public record UpdateStockRequest(
        Integer productId,
        BigDecimal stockChange,
        InventoryActionType actionType,
        String note) {
}
