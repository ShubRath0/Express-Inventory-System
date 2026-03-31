package com.express.inventory.api.purchases.dto.requests;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreatePurchaseRequest(
        @NotNull @Positive BigDecimal quantity,
        @NotNull @Positive BigDecimal unitCost,
        BigDecimal truckCost,
        String supplierName,
        String note) {
}