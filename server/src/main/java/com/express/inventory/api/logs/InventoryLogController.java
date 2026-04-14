package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/logs")
@RequiredArgsConstructor
public class InventoryLogController {

    private final InventoryLogService inventoryLogService;

    @GetMapping
    public List<InventoryTransaction> getAllLogs() {
        return inventoryLogService.getAllLogs();
    }
}