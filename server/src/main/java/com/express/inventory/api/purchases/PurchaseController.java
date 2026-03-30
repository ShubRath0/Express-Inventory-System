package com.express.inventory.api.purchases;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public List<PurchaseEntity> getPurchaseOrders() {
        return purchaseService.getAllPurchases();
    }

    @GetMapping("{id}")
    public PurchaseEntity getPurchaseOrder(@PathVariable Integer id) {
        return purchaseService.getPurchaseById(id);
    }

    @PostMapping
    public PurchaseEntity createPurchaseOrder(@RequestBody PurchaseEntity purchase) {
        return purchaseService.createPurchase(purchase);
    }

    @DeleteMapping("{id}")
    public void deletePurchaseOrder(@PathVariable Integer id) {
        purchaseService.deletePurchase(id);
    }
}