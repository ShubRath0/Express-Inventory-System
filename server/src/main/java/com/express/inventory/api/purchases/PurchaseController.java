package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.purchases.dto.requests.CreatePurchaseRequest;
import com.express.inventory.api.purchases.dto.requests.PurchaseOrderDTO;
import com.express.inventory.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    // GET all Purchase Orders
    @GetMapping
    public ResponseEntity<ApiResponse<List<PurchaseOrderDTO>>> getPurchaseOrders() {
        List<PurchaseOrderDTO> purchaseOrders = purchaseService.getAllPurchases();
        return ApiResponse.success(HttpStatus.OK, "PO's retrieved successfully", purchaseOrders);
    }

    // GET one purchase order by ID
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<PurchaseOrderDTO>> getPurchaseOrder(@PathVariable Integer id) {
        PurchaseOrderDTO purchaseOrder = purchaseService.getPurchaseById(id);
        return ApiResponse.success(HttpStatus.OK, "PO retrieved successfully", purchaseOrder);
    }

    // CREATE a purchase order
    @PostMapping("{id}")
    public ResponseEntity<ApiResponse<PurchaseOrderDTO>> createPurchaseOrder(@PathVariable Integer id,
            @RequestBody CreatePurchaseRequest request) {
        PurchaseOrderDTO purchaseOrder = purchaseService.createPurchase(id, request);
        return ApiResponse.success(HttpStatus.CREATED, "PO created successfully!", purchaseOrder);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deletePurchaseOrder(@PathVariable Integer id) {
        purchaseService.deletePurchase(id);
        return ApiResponse.success(HttpStatus.OK, "PO deleted successfully", null);
    }
}