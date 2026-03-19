package com.express.inventory.api.purchases;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseEntity {
    @Id
    private Integer purchaseId;
    private Integer productId;
    private Integer userId;
    private String orderStatus;
    private Double orderPrice;
    private String purchaseDate;
    private Integer quantity;

}