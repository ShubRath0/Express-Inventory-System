package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD
import java.util.List;
=======
import lombok.RequiredArgsConstructor;
>>>>>>> origin/master

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