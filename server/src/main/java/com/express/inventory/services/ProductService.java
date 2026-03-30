package com.express.inventory.services;

import com.express.inventory.dto.products.ProductStockStatus;
import com.express.inventory.dto.products.request.CreateProductRequest;
import com.express.inventory.dto.products.request.UpdateProductRequest;
import com.express.inventory.exceptions.ProductNotFoundException;
import com.express.inventory.models.ProductEntity;
import com.express.inventory.repositories.ProductRepository;
import com.express.inventory.utility.Utilities;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    public ProductEntity createProduct(CreateProductRequest request) {
        ProductEntity product = new ProductEntity();
        product.setName(request.name());
        product.setCategory(request.category());
        product.setLowStockThreshold(request.lowStockThreshold());
        product.setPrice(request.price());
        product.setStock(request.stock());

        return productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> searchProduct(String keyword) {
        return productRepository.findByName(keyword);
    }

    @Transactional(readOnly = true)
    public ProductEntity getProductById(Integer id) {
        Optional<ProductEntity> product = productRepository.findById(id);

        if (product.isEmpty()) {
            throw new ProductNotFoundException();
        }

        return product.get();
    }

    @Transactional
    public ProductEntity updateProduct(UpdateProductRequest request, Integer id) {
        ProductEntity product = getProductById(id);
        Utilities.copyNonNullProperties(request, product);
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Integer id) {
        try {
            productRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new ProductNotFoundException();
        }
    }

    @Transactional
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> filterProducts(String category, ProductStockStatus stockStatus) {
        List<ProductEntity> products;

        if (category != null && !category.isBlank()) {
            products = productRepository.findByCategory(category);
        } else {
            products = productRepository.findAll();
        }

        if (stockStatus == null) {
            return products;
        }

        return products.stream()
                .filter(product -> {
                    Integer stock = product.getStock();
                    Integer lowStockThreshold = product.getLowStockThreshold();

                    if (stock == null) {
                        return false;
                    }

                    return switch (stockStatus) {
                        case NO_STOCK -> stock == 0;
                        case LOW_STOCK -> lowStockThreshold != null && stock > 0 && stock <= lowStockThreshold;
                        case ABOVE_THRESHOLD -> lowStockThreshold != null && stock > lowStockThreshold;
                    };
                })
                .toList();
    }
}