package com.express.inventory.api.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
<<<<<<< HEAD:server/src/main/java/com/express/inventory/repositories/ProductRepository.java
    List<ProductEntity> findByName(String name);
    List<ProductEntity> findByCategory(String category);
=======
    public List<ProductEntity> findByNameContainingIgnoreCase(String name);
>>>>>>> origin/master:server/src/main/java/com/express/inventory/api/products/ProductRepository.java
}

