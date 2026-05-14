package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.express.inventory.api.products.Product;
import com.express.inventory.api.products.events.StockUpdatedEvent;
import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;
import com.express.inventory.api.purchases.dto.PurchaseOrderResponse;
import com.express.inventory.api.purchases.dto.UpdateStatusRequest;
import com.express.inventory.common.exception.ResourceNotFoundException;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final PurchaseOrderMapper purchaseOrderMapper;
    private final ApplicationEventPublisher eventPublisher;

    @PersistenceContext
    private final EntityManager entityManager;

    public Page<PurchaseOrderResponse> getAllPurchases(Pageable pageable) {
        return purchaseRepository.findAll(pageable)
                .map(purchaseOrderMapper::toDTO);
    }

    public PurchaseOrderResponse getPurchaseById(Integer id) {
        return purchaseRepository.findById(id)
                .map(purchaseOrderMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException(PurchaseOrder.class, id));
    }

    public List<PurchaseOrderResponse> getPurchaseByProductId(Integer productId) {
        return purchaseRepository.findByRecords_ProductId(productId)
                .stream()
                .map(purchaseOrderMapper::toDTO)
                .toList();
    }

    public PurchaseOrderResponse createPurchase(CreatePurchaseOrderRequest request) {
        PurchaseOrder purchase = purchaseOrderMapper.toPurchaseOrder(request);

        List<PurchaseOrderRecord> records = request.records().stream().map(record -> {
            Product productRef = entityManager.getReference(Product.class, record.productId());
            return PurchaseOrderRecord.builder()
                    .purchaseOrder(purchase)
                    .product(productRef)
                    .quantity(record.quantity())
                    .unitPrice(record.unitPrice()).build();
        }).toList();

        purchase.setRecords(records);
        PurchaseOrder saved = purchaseRepository.save(purchase);

        saved.getRecords().forEach(record -> {
            eventPublisher.publishEvent(new StockUpdatedEvent(record.getProduct().getId(), record.getQuantity()));
        });

        return purchaseOrderMapper.toDTO(saved);
    }

    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }

    public PurchaseOrderResponse updateStatus(UpdateStatusRequest request) {
        PurchaseOrder purchase = purchaseRepository.findById(request.purchaseId())
                .orElseThrow(() -> new ResourceNotFoundException(PurchaseOrder.class, request.purchaseId()));
        purchase.setOrderStatus(request.status());
        purchaseRepository.save(purchase);
        return purchaseOrderMapper.toDTO(purchase);
    }
}