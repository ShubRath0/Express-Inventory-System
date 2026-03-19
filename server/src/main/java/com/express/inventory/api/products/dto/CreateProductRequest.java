package com.express.inventory.api.products.dto;

import jakarta.validation.constraints.NotNull;

public class CreateProductRequest {
    @NotNull(message = "Name cannot be blank")
    private String name;

    @NotNull(message = "Product type cannot be blank")
    private String productType;

    @NotNull(message = "stock cannot be blank")
    private int stock;

    @NotNull(message = "stock threshold cannot be blank")
    private Double stockThreshold;

    @NotNull(message = "price cannot be blank")
    private Double price;

    // Constructors

    public CreateProductRequest() {}

    // Getters

    public String getName() {
        return name;
    }

    public String getProductType() {
        return productType;
    }

    public Double getStockThreshold() {
        return stockThreshold;
    }

    public Double getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    // Setters

    public void setName(String name) {
        this.name = name;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public void setStockThreshold(Double stockThreshold) {
        this.stockThreshold = stockThreshold;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
