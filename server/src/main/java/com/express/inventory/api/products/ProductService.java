package com.express.inventory.api.products;

import com.express.inventory.api.products.dto.CreateProductRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Create Product
    @Transactional
    public ProductEntity createProduct(CreateProductRequest request) {
        ProductEntity product = new ProductEntity();
        product.setName(request.getName());
        product.setProductType(request.getProductType());
        product.setStock(request.getStock());
        product.setStockThreshold(request.getStockThreshold());
        product.setPrice(request.getPrice());

        return product;
    }

    // Read Operations
    @Transactional(readOnly = true)
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> getProductById(int id) {
        return productRepository.findById(id);
    }

    /* @Transactional(readOnly = true)
    public ProductEntity getProductBySku(String sku) {
        return productRepository.findBySku(sku)
            .orElseThrow(() ->
                    new IllegalArgumentException("Product not found with SKU: " + sku)
            );
    } */
}
