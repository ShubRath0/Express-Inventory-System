package com.express.inventory.api.tickets.dto.response;

import java.time.LocalDateTime;

import com.express.inventory.api.tickets.enums.TicketPriority;
import com.express.inventory.api.tickets.enums.TicketStatus;

public record TicketResponse(
        Long id,
        String title,
        String description,
        TicketStatus status,
        TicketPriority priority,
        Long userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}