package com.express.inventory.api.products.dto.request;

import com.express.inventory.api.products.enums.Category;
import com.express.inventory.api.products.enums.ProductStockStatus;

public record GetFilteredRequest(
        String search,
        Category category,
        ProductStockStatus stockStatus) {
}