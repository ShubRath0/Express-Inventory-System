package com.express.inventory.api.purchases;

import java.math.BigDecimal;

import com.express.inventory.api.products.Product;
import com.express.inventory.common.classes.Auditable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrderRecord extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id")
    private PurchaseOrder purchaseOrder;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;
    private BigDecimal quantity;
    private BigDecimal unitPrice;

}
