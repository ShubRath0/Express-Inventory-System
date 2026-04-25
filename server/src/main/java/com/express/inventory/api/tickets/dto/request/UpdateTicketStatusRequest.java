package com.express.inventory.api.tickets.dto.request;

import com.express.inventory.api.tickets.enums.TicketStatus;

import jakarta.validation.constraints.NotNull;

public record UpdateTicketStatusRequest(
        @NotNull TicketStatus status
) {
}