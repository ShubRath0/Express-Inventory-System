package com.express.inventory.api.purchases.dto;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

// import com.express.inventory.api.purchases.PurchaseOrder;

public record CreatePurchaseOrderRequest(

    @NotNull(message = "userId cannot be blank") Integer userId,
    @NotNull(message = "Order status cannot be blank") String orderStatus,
    @NotNull(message = "Order price cannot be blank") BigDecimal orderPrice,
    @NotNull(message = "Purchase date cannot be blank") String purchaseDate,
    @NotNull(message = "total quantity cannot be blank") Double totalQuantity,
    @NotEmpty(message = "Records cannot be empty") List<PurchaseOrderRecordDTO> records
) {
}
