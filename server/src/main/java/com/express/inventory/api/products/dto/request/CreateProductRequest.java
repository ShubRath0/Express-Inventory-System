package com.express.inventory.api.products.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public record CreateProductRequest(
        @NotNull(message = "Name cannot be blank") String name,
        @NotNull(message = "Category ('PRODUCE' | 'PLASTIC') cannot be blank") String category,
        @NotNull(message = "stock cannot be blank") BigDecimal stock,
        @NotNull(message = "stock threshold cannot be blank") BigDecimal lowStockThreshold,
        @NotNull(message = "price cannot be blank") BigDecimal price) {
}
