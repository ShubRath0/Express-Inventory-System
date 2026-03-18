package com.express.inventory.api.products;

import com.express.inventory.dto.products.request.CreateProductRequest;
import com.express.inventory.dto.products.request.UpdateProductRequest;
import com.express.inventory.exceptions.ProductNotFoundException;
import com.express.inventory.utility.Utilities;

import lombok.AllArgsConstructor;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepositoryV2 productRepository;

    // Create Product
    @Transactional
    public ProductEntity createProduct(CreateProductRequest request) {
        ProductEntity product = ProductEntity.builder()
        .name(request.name())
        .productType(request.productType())
        .stockThreshold(request.stockThreshold())
        .price(request.price())
        .stock(request.stock()).build();
        return productRepository.save(product);
    }

    // Read Product(s)
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

    // Update Product
    @Transactional
    public ProductEntity updateProduct(UpdateProductRequest request, Integer id) {
        ProductEntity product = getProductById(id);
        Utilities.copyNonNullProperties(request, product);
        return productRepository.save(product);
    }

    // Delete Product
    @Transactional
    public void deleteProduct(Integer id) {
        try { 
            productRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex ) {
            throw new ProductNotFoundException();
        }
    }

}
