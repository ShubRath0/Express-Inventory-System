package com.express.inventory.api.purchases;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<PurchaseOrder, Integer> {

    public List<PurchaseOrder> findByRecords_ProductId(Integer productId);
    
}