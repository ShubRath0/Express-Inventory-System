package com.express.inventory.api.tickets.dto.request;

import com.express.inventory.api.tickets.enums.TicketPriority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateTicketRequest(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull TicketPriority priority
) {
}