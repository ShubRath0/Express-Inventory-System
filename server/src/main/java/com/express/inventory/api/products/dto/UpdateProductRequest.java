package com.express.inventory.api.products.dto;

public class UpdateProductRequest {
    private String name;
    private String productType;
    private int stock;
    private Double stockThreshold;
    private Double price;

    // Constructors

    public UpdateProductRequest() {}

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
