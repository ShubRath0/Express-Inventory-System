package com.express.inventory.api.notifications;

<<<<<<< HEAD
import com.express.inventory.api.logs.InventoryLogEntity;
import com.express.inventory.api.logs.InventoryLogService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class NotificationController {

    private final InventoryLogService inventoryLogService;

    public NotificationController(InventoryLogService inventoryLogService) {
        this.inventoryLogService = inventoryLogService;
    }

@GetMapping("/api/notifications")
public List<NotificationDto> getNotifications() {
    return inventoryLogService.getRecentLogs()
            .stream()
            .map(log -> {
                NotificationDto dto = new NotificationDto();
                dto.setId(Long.valueOf(log.getLogId()));
                dto.setMessage(buildMessage(log));
                dto.setType("INFO");
                dto.setRead(false);
                return dto;
            })
            .toList();
}

private String buildMessage(InventoryLogEntity log) {
    String action = log.getActionType().name();
    String note = log.getNote();

    if ("Product is low in stock".equals(note)) {
        return "Low stock alert";
    }

    switch (action) {
        case "ADD":
            return "Product added";
        case "DELETE":
            return "Product deleted";
        case "UPDATE":
            return "Product updated";
        default:
            return "Inventory activity";
        }
=======
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDTO>>> getNotifications() {
        List<NotificationDTO> notifications = notificationService.getNotifications();
        return ApiResponse.success(HttpStatus.OK, "Retrieved notifications", notifications);
>>>>>>> master
    }
}