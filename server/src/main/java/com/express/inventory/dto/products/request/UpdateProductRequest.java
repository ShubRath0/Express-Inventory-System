package com.express.inventory.dto.products.request;

import java.math.BigDecimal;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateProductRequest {
    private Integer id;
    private String name;
    private String productType;
    private BigDecimal stock;
    private Double stockThreshold;
    private Double price;

}
