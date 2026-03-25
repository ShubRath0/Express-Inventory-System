package com.express.inventory.dto.products.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateProductRequest {
    private Integer id;
    private String name;
    private String productType;
    private int stock;
    private Double stockThreshold;
    private Double price;

}
