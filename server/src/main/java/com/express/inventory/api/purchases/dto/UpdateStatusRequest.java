package com.express.inventory.api.purchases.dto;

import com.express.inventory.api.purchases.enums.Status;

import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(
        @NotNull Status status,
        @NotNull Integer purchaseId) {
}
