package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.express.inventory.api.products.ProductEntity;

public interface InventoryLogRepository extends JpaRepository<InventoryLogEntity, Integer> {
    // Get logs for a specific product
    List<InventoryLogEntity> findByProduct(ProductEntity product);

    // An optional addition to display latest logs first
    List<InventoryLogEntity> findByProductOrderByCreatedAtDesc(ProductEntity product);

    List<InventoryLogEntity> findTop5ByOrderByLogIdDesc();
}
