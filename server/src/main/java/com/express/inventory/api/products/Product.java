package com.express.inventory.api.products;

import java.sql.Timestamp;

import com.express.inventory.api.enums.Category;

public class Product {
    private String name;
    private Integer id;
    private Double price;
    private Double stock;
    private Timestamp created_at;
    private Category category;

    public Product() {
    }

    public String getName() {
        return this.name;
    }

    public Product(Integer id, String name, Double price, Double stock, Category category, Timestamp created_at) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.stock = stock;
        this.created_at = created_at;
        this.category = category;
    }

    public Double getStock() {
        return this.stock;
    }

    public void setStock(Double stock) {
        this.stock = stock;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Timestamp getCreated_at() {
        return this.created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
