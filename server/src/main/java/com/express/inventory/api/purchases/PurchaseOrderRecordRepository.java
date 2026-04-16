package com.express.inventory.api.purchases;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderRecordRepository extends JpaRepository<PurchaseOrderRecord, Integer> {
    
}
