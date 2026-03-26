package com.express.inventory.models;

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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CsvBindByName(column = "Name")
    private String name;

    @CsvBindByName(column = "Category")
    private String category;

    @CsvBindByName(column = "Stock")
    private BigDecimal stock;

    @CsvBindByName(column = "LowStockThreshold")
    private BigDecimal lowStockThreshold;

    @CsvBindByName(column = "Price")
    private BigDecimal price;

    @CreationTimestamp
    private Timestamp createdAt;

    @CreationTimestamp
    private Timestamp lastUpdated;
}
