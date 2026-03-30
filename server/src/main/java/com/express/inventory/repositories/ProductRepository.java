package com.express.inventory.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.express.inventory.models.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    List<ProductEntity> findByName(String name);
    List<ProductEntity> findByCategory(String category);
}

