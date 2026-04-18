package com.express.inventory.api.purchases;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;

@Mapper(componentModel = "spring")
public interface PurchaseOrderMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "records", ignore = true)
    @Mapping(target = "userId", ignore = true)
    PurchaseOrder toPurchaseOrder(CreatePurchaseOrderRequest request);
}
