package com.express.inventory.api.products;

<<<<<<< HEAD:server/src/main/java/com/express/inventory/models/ProductEntity.java
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

=======
import java.math.BigDecimal;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.opencsv.bean.CsvBindByName;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

>>>>>>> origin/master:server/src/main/java/com/express/inventory/api/products/ProductEntity.java
@Entity
@Table(name = "products")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CsvBindByName(column = "Name")
    private String name;

    @CsvBindByName(column = "Category")
    private String category;
<<<<<<< HEAD:server/src/main/java/com/express/inventory/models/ProductEntity.java
    private Integer stock;
    private Integer lowStockThreshold;
=======

    @CsvBindByName(column = "Stock")
    private BigDecimal stock;

    @CsvBindByName(column = "LowStockThreshold")
    private BigDecimal lowStockThreshold;

    @CsvBindByName(column = "Price")
>>>>>>> origin/master:server/src/main/java/com/express/inventory/api/products/ProductEntity.java
    private BigDecimal price;

    @CreationTimestamp
    private Timestamp createdAt;

    @CreationTimestamp
    private Timestamp lastUpdated;

    public ProductEntity() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getLowStockThreshold() {
        return lowStockThreshold;
    }

    public void setLowStockThreshold(Integer lowStockThreshold) {
        this.lowStockThreshold = lowStockThreshold;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Timestamp lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}