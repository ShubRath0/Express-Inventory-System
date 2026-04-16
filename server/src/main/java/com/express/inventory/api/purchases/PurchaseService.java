package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.purchases.exception.PurchaseNotFoundException;
import com.express.inventory.api.products.Product;
import com.express.inventory.api.products.ProductRepository;
import com.express.inventory.api.products.ProductService;
import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    public List<PurchaseOrder> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public PurchaseOrder getPurchaseById(Integer id) {
        return purchaseRepository.findById(id)
                .orElseThrow(() -> new PurchaseNotFoundException("Purchase not found with id: " + id));
    }

    public List<PurchaseOrder> getPurchaseByProductId(Integer productId) {
        return purchaseRepository.findByRecords_ProductId(productId);
    }

    public PurchaseOrder createPurchase(CreatePurchaseOrderRequest request) {
        PurchaseOrder purchase = PurchaseOrder.builder()
                .orderStatus(request.orderStatus())
                .orderPrice(request.orderPrice())
                .totalQuantity(request.totalQuantity()).build();
                List<PurchaseOrderRecord> records = request.records().stream().map(record -> {
                    Product product = productService.getProductById(record.productId());
                    product.setStock(product.getStock().add(record.quantity()));
                    productRepository.save(product);
                    return PurchaseOrderRecord.builder()
                    .product(productService.getProductById(record.productId()))
                    .quantity(record.quantity())
                    .unitPrice(record.unitPrice()).build();
                }).toList();
                purchase.setRecords(records);
        return purchaseRepository.save(purchase);
    }

    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }
}