package com.express.inventory.api.products.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UpdateStockRequest(
        @NotNull(message = "Stock amount cannot be null") BigDecimal stock,
        @NotEmpty(message = "Reason cannot be empty") String reason) {
}
