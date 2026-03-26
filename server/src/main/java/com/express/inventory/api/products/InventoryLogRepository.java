package com.express.inventory.api.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.express.inventory.models.ProductEntity;

public interface InventoryLogRepository extends JpaRepository<InventoryLogEntity, Integer> {
    // Get logs for a specific product
    List<InventoryLogEntity> findByProduct(ProductEntity product);

    // An optional addition to display latest logs first
    List<InventoryLogEntity> findByProductOrderByCreatedAtDesc(ProductEntity product);
}
