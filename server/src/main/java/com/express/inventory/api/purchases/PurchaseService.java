package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.products.ProductEntity;
import com.express.inventory.api.products.ProductRepository;
import com.express.inventory.api.products.ProductService;
import com.express.inventory.api.purchases.dto.requests.CreatePurchaseRequest;
import com.express.inventory.api.purchases.dto.requests.PurchaseOrderDTO;
import com.express.inventory.api.purchases.exception.PurchaseNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    public List<PurchaseOrderDTO> getAllPurchases() {
        return purchaseRepository.findAll().stream()
                .map(PurchaseOrderDTO::fromEntity).toList();
    }

    public PurchaseOrderDTO getPurchaseById(Integer id) {
        PurchaseOrder purchaseOrder = purchaseRepository.findById(id)
                .orElseThrow(() -> new PurchaseNotFoundException("Purchase not found with id: " + id));

        return PurchaseOrderDTO.fromEntity(purchaseOrder);
    }

    @Transactional
    public PurchaseOrderDTO createPurchase(Integer productId, CreatePurchaseRequest request) {
        ProductEntity product = productService.getProductById(productId);
        PurchaseOrder purchaseOrder = PurchaseOrder.builder()
                .product(product)
                .quantity(request.quantity())
                .unitCost(request.unitCost())
                .truckCost(request.truckCost())
                .supplierName(request.supplierName())
                .note(request.note())
                .build();

        product.setStock(product.getStock().add(request.quantity()));

        purchaseRepository.save(purchaseOrder);
        productRepository.save(product);

        return PurchaseOrderDTO.fromEntity(purchaseOrder);
    }

    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }
}