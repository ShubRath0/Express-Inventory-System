package com.express.inventory.api.logs;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/logs")
@RequiredArgsConstructor
public class InventoryLogController {

    private final InventoryLogService inventoryLogService;

    @GetMapping
    public List<InventoryLogEntity> getAllLogs() {
        return inventoryLogService.getAllLogs();
    }
}