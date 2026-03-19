package com.express.inventory.api.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepositoryV2 extends JpaRepository<ProductEntity, Integer > {
    public List<ProductEntity> findByName(String name);
}
