package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryLogRepository extends JpaRepository<InventoryLogEntity, Integer> {
    List<InventoryLogEntity> findTop5ByOrderByLogIdDesc();
}