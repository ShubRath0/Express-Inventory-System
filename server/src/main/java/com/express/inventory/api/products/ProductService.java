package com.express.inventory.api.products;

import com.express.inventory.api.products.dto.CreateProductRequest;
import com.express.inventory.api.products.dto.UpdateProductRequest;

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
       return productRepository.createProductEntity(request);
    }

    // Read Product(s)
    @Transactional(readOnly = true)
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> searchProduct(String keyword) {
        return productRepository.findSearched(keyword);
    }

    @Transactional(readOnly = true)
    public ProductEntity getProductById(int id) {
        return productRepository.findById(id);
    }

    // Update Product
    @Transactional
    public ProductEntity updateProduct(UpdateProductRequest request) {
        return productRepository.updateProductEntity(request);
    }

    // Delete Product
    @Transactional
    public void deleteProduct(int id) {
        boolean deleted = productRepository.deleteProductEntity(id);

        if (!deleted) {
            throw new RuntimeException("Product not found");
        }
    }
}
