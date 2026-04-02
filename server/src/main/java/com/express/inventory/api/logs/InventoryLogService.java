package com.express.inventory.api.logs;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryLogService {

    private final InventoryLogRepository inventoryLogRepository;

    public List<InventoryLogEntity> getAllLogs() {
        return inventoryLogRepository.findAll();
    }
}