package com.express.inventory.api.logs;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.express.inventory.api.logs.events.InventoryTransactionEvent;

@Mapper(componentModel = "spring")
public interface InventoryTransactionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    InventoryTransaction toInventoryTransaction(InventoryTransactionEvent event);
}
