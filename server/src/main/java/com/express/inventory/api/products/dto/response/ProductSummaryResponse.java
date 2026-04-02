package com.express.inventory.api.products.dto.response;

import java.math.BigDecimal;

public record ProductSummaryResponse(
    long totalProducts,
    BigDecimal totalStock,
    BigDecimal totalUnitPrice,
    BigDecimal totalInventoryValue
) {}
