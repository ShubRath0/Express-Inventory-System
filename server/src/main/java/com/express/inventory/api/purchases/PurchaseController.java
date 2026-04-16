package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    @GetMapping
    public List<PurchaseOrder> getPurchaseOrders() {
        return purchaseService.getAllPurchases();
    }

    @GetMapping("{id}")
    public PurchaseOrder getPurchaseOrder(@PathVariable Integer id) {
        return purchaseService.getPurchaseById(id);
    }

    @PostMapping
    public PurchaseOrder createPurchaseOrder(@RequestBody PurchaseOrder purchase) {
        return purchaseService.createPurchase(purchase);
    }

    @DeleteMapping("{id}")
    public void deletePurchaseOrder(@PathVariable Integer id) {
        purchaseService.deletePurchase(id);
    }
}