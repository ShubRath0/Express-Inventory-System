package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryLogService {

    private final InventoryLogRepository inventoryLogRepository;

<<<<<<< HEAD
    public List<InventoryLogEntity> getRecentLogs() {
        return inventoryLogRepository.findTop5ByOrderByLogIdDesc();
=======
    public List<InventoryTransaction> getAllLogs() {
        return inventoryLogRepository.findAll();
>>>>>>> master
    }

    public List<InventoryTransaction> getRecentLogs() {
        return inventoryLogRepository.findTop5ByOrderByIdDesc();
    }
}