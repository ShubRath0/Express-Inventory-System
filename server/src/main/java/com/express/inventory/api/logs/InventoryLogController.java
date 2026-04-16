package com.express.inventory.api.logs;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inventory-logs")
public class InventoryLogController {
<<<<<<< HEAD
=======

    private final InventoryLogService inventoryLogService;

    @GetMapping
    public List<InventoryTransaction> getAllLogs() {
        return inventoryLogService.getAllLogs();
    }
>>>>>>> master
}