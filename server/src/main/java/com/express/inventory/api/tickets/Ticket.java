package com.express.inventory.api.tickets;

import com.express.inventory.api.tickets.enums.TicketPriority;
import com.express.inventory.api.tickets.enums.TicketStatus;
import com.express.inventory.common.classes.Auditable;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Ticket extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    private TicketPriority priority;

    // leave null for now (per assignment note)
    private Long userId;
}