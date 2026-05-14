package com.express.inventory.api.purchases;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.express.inventory.api.purchases.dto.CreatePurchaseOrderRequest;
import com.express.inventory.api.purchases.dto.PurchaseOrderRecordDTO;
import com.express.inventory.api.purchases.dto.PurchaseOrderResponse;

@Mapper(componentModel = "spring")
public interface PurchaseOrderMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "records", ignore = true)
    @Mapping(target = "userId", ignore = true)
    PurchaseOrder toPurchaseOrder(CreatePurchaseOrderRequest request);

    PurchaseOrderResponse toDTO(PurchaseOrder purchaseOrder);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    PurchaseOrderRecordDTO toDTO(PurchaseOrderRecord record);
}
