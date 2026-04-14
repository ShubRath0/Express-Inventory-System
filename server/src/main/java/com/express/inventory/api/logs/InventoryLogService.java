package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryLogService {

    private final InventoryLogRepository inventoryLogRepository;

    public List<InventoryTransaction> getAllLogs() {
        return inventoryLogRepository.findAll();
    }

    public List<InventoryTransaction> getRecentLogs() {
        return inventoryLogRepository.findTop5ByOrderByIdDesc();
    }
}