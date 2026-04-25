package com.express.inventory.api.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    public List<Product> findByNameContainingIgnoreCase(String name);

    public List<Product> findByCategory(String category);

    @Query("SELECT DISTINCT products.category FROM Product products")
    public List<Product> findAllCategories();

    public List<Product> findTop5ByOrderByCreatedAtDesc();
}
