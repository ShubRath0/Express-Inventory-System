package com.express.inventory.api.purchases;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrderRecord {
    @Id
    private Integer id;
    private Integer purchaseId;
    private Integer productId;
    private Double quantity;
    private BigDecimal unitPrice;

}
