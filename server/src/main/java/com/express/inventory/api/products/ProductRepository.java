package com.express.inventory.api.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    public List<ProductEntity> findByNameContainingIgnoreCase(String name);

    public List<ProductEntity> findByCategory(String category);

    @Query("SELECT DISTINCT products.category FROM ProductEntity products")
    public List<ProductEntity> findAllCategories();

    public List<ProductEntity> findTop5ByOrderByCreatedAtDesc();
}
