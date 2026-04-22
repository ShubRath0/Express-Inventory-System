package com.express.inventory.api.purchases.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public record PurchaseOrderRecordDTO(
    @NotNull(message = "Product ID cannot be blank") Integer productId,
    @NotNull(message = "Quantity cannot be blank") BigDecimal quantity,
    @NotNull(message = "Unit price cannot be blank") BigDecimal unitPrice
) {
    
}
