package com.express.inventory.api.products.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record ProductResponse(
        @NotNull Integer id,
        @NotNull String name,
        @NotNull String category,
        @NotNull BigDecimal price,
        @NotNull BigDecimal stock,
        @NotNull BigDecimal lowStockThreshold,
        @NotNull LocalDateTime createdAt,
        @NotNull LocalDateTime updatedAt) {
}