package com.express.inventory.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.express.inventory.dto.products.request.CreateProductRequest;
import com.express.inventory.dto.products.request.UpdateProductRequest;
import com.express.inventory.exceptions.ProductNotFoundException;
import com.express.inventory.models.ProductEntity;
import com.express.inventory.repositories.ProductRepository;
import com.express.inventory.utility.Utilities;
import com.opencsv.bean.CsvToBeanBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Create Product
    @Transactional
    public ProductEntity createProduct(CreateProductRequest request) {
        ProductEntity product = ProductEntity.builder()
                .name(request.name())
                .category(request.category())
                .lowStockThreshold(request.lowStockThreshold())
                .price(request.price())
                .stock(request.stock()).build();
        return productRepository.save(product);
    }

    @Transactional
    public List<ProductEntity> createProductsFromCsv(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<ProductEntity> products = new CsvToBeanBuilder<ProductEntity>(reader)
                    .withType(ProductEntity.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            return productRepository.saveAll(products);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }

    // Read Product(s)
    @Transactional(readOnly = true)
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> searchProduct(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
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
        } catch (EmptyResultDataAccessException ex) {
            throw new ProductNotFoundException();
        }
    }

    @Transactional
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

}
