package com.express.inventory.dto.products.request;

public record UpdateProductRequest(
    Integer id,
    String name,
    String productType,
    int stock,
    Double stockThreshold,
    Double price
) {} 
