package com.express.inventory.api.products;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryLogRepository extends JpaRepository<InventoryLogEntity, Integer> {
    // Get logs for a specific product
    List<InventoryLogEntity> findByProduct(ProductEntity product);

    // An optional addition to display latest logs first
    List<InventoryLogEntity> findByProductOrderByCreatedAtDesc(ProductEntity product);
}
