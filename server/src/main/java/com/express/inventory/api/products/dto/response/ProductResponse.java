package com.express.inventory.api.products.dto.response;

import java.math.BigDecimal;

public record ProductResponse(
    Integer id,
    String name,
    String category,
    BigDecimal price,
    BigDecimal stock,
    BigDecimal lowStockThreshold
) {}