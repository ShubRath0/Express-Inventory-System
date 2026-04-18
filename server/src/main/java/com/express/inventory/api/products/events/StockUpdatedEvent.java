package com.express.inventory.api.products.events;

import java.math.BigDecimal;

public record StockUpdatedEvent(
        Integer productId,
        BigDecimal quantity) {
}
