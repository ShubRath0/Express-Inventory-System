package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;
import com.express.inventory.api.purchases.dto.PurchaseOrderResponse;
import com.express.inventory.api.purchases.dto.UpdateStatusRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    @GetMapping
    public List<PurchaseOrderResponse> getPurchaseOrders() {
        return purchaseService.getAllPurchases();
    }

    @GetMapping("/{id}")
    public PurchaseOrderResponse getPurchaseOrder(@PathVariable Integer id) {
        return purchaseService.getPurchaseById(id);
    }

    @GetMapping("/product/{id}")
    public List<PurchaseOrderResponse> getPurchaseOrderByProductId(@PathVariable Integer id) {
        return purchaseService.getPurchaseByProductId(id);
    }

    @PostMapping
    public PurchaseOrderResponse createPurchaseOrder(@RequestBody CreatePurchaseOrderRequest purchase) {
        return purchaseService.createPurchase(purchase);
    }

    @PatchMapping
    public PurchaseOrderResponse updatePurchaseOrderStatus(@RequestBody UpdateStatusRequest request) {
        return purchaseService.updateStatus(request);
    }

    @DeleteMapping("/{id}")
    public void deletePurchaseOrder(@PathVariable Integer id) {
        purchaseService.deletePurchase(id);
    }
}