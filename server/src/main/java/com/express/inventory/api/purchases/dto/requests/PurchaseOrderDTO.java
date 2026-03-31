package com.express.inventory.api.purchases.dto.requests;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.express.inventory.api.purchases.PurchaseOrder;

public record PurchaseOrderDTO(
        Integer purchaseId,
        String productName,
        BigDecimal quantity,
        BigDecimal unitPrice,
        BigDecimal truckCost,
        BigDecimal totalCost,
        String supplierName,
        String note,
        LocalDate purchaseDate) {
    public static PurchaseOrderDTO fromEntity(PurchaseOrder purchaseOrder) {
        return new PurchaseOrderDTO(
                purchaseOrder.getPurchaseId(),
                purchaseOrder.getProduct().getName(),
                purchaseOrder.getQuantity(),
                purchaseOrder.getUnitCost(),
                purchaseOrder.getTruckCost(),
                purchaseOrder.getUnitCost().multiply(purchaseOrder.getQuantity()).add(purchaseOrder.getTruckCost()),
                purchaseOrder.getSupplierName(),
                purchaseOrder.getNote(),
                purchaseOrder.getPurchaseDate());
    }
}
