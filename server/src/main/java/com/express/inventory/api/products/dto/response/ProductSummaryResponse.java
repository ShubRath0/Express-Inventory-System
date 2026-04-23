package com.express.inventory.api.products.dto.response;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public record ProductSummaryResponse(
        @NotNull long totalProducts,
        @NotNull BigDecimal totalStock,
        @NotNull BigDecimal totalUnitPrice,
        @NotNull BigDecimal totalInventoryValue) {
}
