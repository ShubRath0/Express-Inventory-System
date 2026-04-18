package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.express.inventory.api.products.ProductService;
import com.express.inventory.api.products.events.StockUpdatedEvent;
import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;
import com.express.inventory.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ProductService productService;

    public List<PurchaseOrder> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public PurchaseOrder getPurchaseById(Integer id) {
        return purchaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(PurchaseOrder.class, id));
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
            return PurchaseOrderRecord.builder()
                    .product(productService.getProductById(record.productId()))
                    .quantity(record.quantity())
                    .unitPrice(record.unitPrice()).build();
        }).toList();

        purchase.setRecords(records);
        PurchaseOrder saved = purchaseRepository.save(purchase);

        saved.getRecords().forEach(record -> {
            eventPublisher.publishEvent(new StockUpdatedEvent(record.getProduct().getId(), record.getQuantity()));
        });

        return saved;
    }

    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }
}