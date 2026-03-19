package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.exceptions.InvalidPurchaseException;
import com.express.inventory.exceptions.PurchaseNotFoundException;

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
        if (purchase.getQuantity() == null || purchase.getQuantity() <= 0) {
            throw new InvalidPurchaseException("Quantity must be greater than 0");
        }

        return purchaseRepository.save(purchase);
    }
}