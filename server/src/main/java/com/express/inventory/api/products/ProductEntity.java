package com.express.inventory.api.products;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class ProductEntity {
    
    @Id
    private int id;
    private String name;
    private String productType;
    private Double stockThreshold;
    private Double price;
    private int stock;
    private Timestamp created_at;
    private Timestamp updated_at;

    // Constructors
    public ProductEntity() {

    }

    public ProductEntity(int id) {
        this.id = id;
    }

    // Getters
    public int getId() {
        return id;
    }

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

    public Timestamp getCreatedAt() {
        return created_at;
    }

    public Timestamp getUpdatedAt() {
        return updated_at;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

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

    public void setCreatedAt(Timestamp created_at) {
        this.created_at = created_at;
    }

    public void setUpdatedAt(Timestamp updated_at) {
        this.updated_at = updated_at;
    }

}
