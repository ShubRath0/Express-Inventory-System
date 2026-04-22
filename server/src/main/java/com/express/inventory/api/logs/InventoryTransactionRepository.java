package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.express.inventory.api.products.Product;

public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Integer> {
    // Get logs for a specific product
    List<InventoryTransaction> findByProduct(Product product);

    // An optional addition to display latest logs first
    List<InventoryTransaction> findByProductOrderByCreatedAtDesc(Product product);

    List<InventoryTransaction> findTop5ByOrderByIdDesc();
}
