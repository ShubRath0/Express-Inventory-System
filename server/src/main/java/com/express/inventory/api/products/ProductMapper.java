package com.express.inventory.api.products;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.response.ProductResponse;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    public ProductResponse toDTO(Product product);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    public Product toProduct(CreateProductRequest request);
}