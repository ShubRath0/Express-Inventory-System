package com.express.inventory.api.products.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class CreateProductRequest {
    /* @NotBlank(message = "SKU is required")
    @Size(max = 50, message = "SKU must be at most 50 characters")
    private String sku; */

    @NotBlank(message = "Product name is required")
    @Size(max = 150, message = "Product name must be at most 150 characters")
    private String name;

    @Size(max = 500, message = "Product type must be at most 500 characters")
    private String productType;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @NotNull(message = "Stock threshold is required")
    @Min(value = 0, message = "Stock threshold must be greater than 0")
    private Double stockThreshold;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Invalid price format")
    private BigDecimal price;

    // Constructors

    public CreateProductRequest() {}

    // Getters

    /* public String getSku() {
        return sku;
    } */

    public String getName() {
        return name;
    }

    public String getProductType() {
        return productType;
    }

    public Double getStockThreshold() {
        return stockThreshold;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    // Setters

    /* public void setSku(String sku) {
        this.sku = sku;
    } */

    public void setName(String name) {
        this.name = name;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public void setStockThreshold(Double stockThreshold) {
        this.stockThreshold = stockThreshold;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
