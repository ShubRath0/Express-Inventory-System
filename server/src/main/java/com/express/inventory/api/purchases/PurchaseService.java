package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;
import com.express.inventory.api.purchases.exception.InvalidPurchaseException;
import com.express.inventory.api.purchases.exception.PurchaseNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public List<PurchaseOrder> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public PurchaseOrder getPurchaseById(Integer id) {
        return purchaseRepository.findById(id)
                .orElseThrow(() -> new PurchaseNotFoundException("Purchase not found with id: " + id));
    }

    public PurchaseOrder createPurchase(CreatePurchaseOrderRequest request) {
        PurchaseOrder purchase = PurchaseOrder.builder()
                .userId(request.userId())
                .orderStatus(request.orderStatus())
                .orderPrice(request.orderPrice())
                .purchaseDate(request.purchaseDate())
                .totalQuantity(request.totalQuantity()).build();
                records(request.records().stream(
                    record -> PurchaseOrderRecord.builder()
                        .productId(record.productId())
                        .quantity(record.quantity())
                        .price(record.price())
                        .build()
                ).toList());
        return purchaseRepository.save(purchase);
        // if (request.getTotalQuantity() == null || request.getTotalQuantity() <= 0) {
        //     throw new InvalidPurchaseException("Quantity must be greater than 0");
        // }

        // return purchaseRepository.save(request);
    }

    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }
}