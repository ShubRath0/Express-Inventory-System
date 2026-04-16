package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.purchases.exception.InvalidPurchaseException;
import com.express.inventory.api.purchases.exception.PurchaseNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public List<PurchaseEntity> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public PurchaseEntity getPurchaseById(Integer id) {
        return purchaseRepository.findById(id)
                .orElseThrow(() -> new PurchaseNotFoundException("Purchase not found with id: " + id));
    }

    public PurchaseEntity createPurchase(PurchaseEntity purchase) {
        if (purchase.getTotalQuantity() == null || purchase.getTotalQuantity() <= 0) {
            throw new InvalidPurchaseException("Quantity must be greater than 0");
        }

        return purchaseRepository.save(purchase);
    }

    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }
}