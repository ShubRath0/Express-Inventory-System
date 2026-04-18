package com.express.inventory.api.logs.events;

import java.math.BigDecimal;

import com.express.inventory.api.logs.enums.InventoryActionType;
import com.express.inventory.api.products.Product;

public record InventoryTransactionEvent(
        Product product,
        BigDecimal stockChange,
        InventoryActionType actionType,
        String note) {
}
