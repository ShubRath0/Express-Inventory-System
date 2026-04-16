package com.express.inventory.api.purchases;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<PurchaseOrder, Integer> {

    public Optional<List<PurchaseOrder>> findPurchaseByProductId(Integer productId);
}