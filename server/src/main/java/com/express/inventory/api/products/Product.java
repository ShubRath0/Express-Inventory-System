package com.express.inventory.api.products;

import java.math.BigDecimal;

import com.express.inventory.api.products.enums.Category;
import com.express.inventory.common.classes.Auditable;
import com.opencsv.bean.CsvBindByName;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Table(name = "products")
public class Product extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CsvBindByName(column = "Name")
    private String name;

    @Enumerated(EnumType.STRING)
    @CsvBindByName(column = "Category")
    private Category category;

    @CsvBindByName(column = "Stock")
    private BigDecimal stock;

    @CsvBindByName(column = "LowStockThreshold")
    private BigDecimal lowStockThreshold;

    @CsvBindByName(column = "Price")
    private BigDecimal price;
}
