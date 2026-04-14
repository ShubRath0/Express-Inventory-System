package com.express.inventory.api.purchases;

import jakarta.persistence.Entity;
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
@Table(name = "purchase_orders")
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