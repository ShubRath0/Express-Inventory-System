package com.express.inventory.api.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    public List<ProductEntity> findByNameContainingIgnoreCase(String name);

    public List<ProductEntity> findByCategory(String category);
}
