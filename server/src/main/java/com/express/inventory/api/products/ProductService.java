package com.express.inventory.api.products;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.express.inventory.api.logs.InventoryLogEntity;
import com.express.inventory.api.logs.InventoryLogRepository;
import com.express.inventory.api.logs.enums.InventoryActionType;
import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.GetFilteredRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.api.products.dto.request.UpdateStockRequest;
import com.express.inventory.api.products.exception.ProductNotFoundException;
import com.express.inventory.utility.Utilities;
import com.opencsv.bean.CsvToBeanBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryLogRepository inventoryLogRepository;

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

    // Delete every product (TESTING)
    @Transactional
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    // Stock Changes and Log Creation
    @Transactional
    public void updateStock(Integer productId, BigDecimal stockChange, InventoryActionType actionType, String note) {

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException());

        // Update stock
        product.setStock(product.getStock().add(stockChange));

        productRepository.save(product);

        // Create log
        InventoryLogEntity log = new InventoryLogEntity();
        log.setProduct(product);
        log.setAdjustmentQuantity(stockChange);
        log.setActionType(actionType);
        log.setNote(note);

        inventoryLogRepository.save(log);
    }

    // Update stock using a DTO
    @Transactional
    public ProductEntity updateStock(Integer productId, UpdateStockRequest request) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException());

        BigDecimal finalStock = product.getStock().add(request.stock());

        InventoryLogEntity log = InventoryLogEntity.builder()
                .product(product)
                .initialStock(product.getStock())
                .finalStock(finalStock)
                .adjustmentQuantity(request.stock())
                .note(request.reason())
                .actionType(InventoryActionType.ADJUSMENT)
                .build();

        product.setStock(finalStock);
        productRepository.save(product);
        inventoryLogRepository.save(log);

        return product;
    }

    @Transactional(readOnly = true)
    public List<ProductEntity> filterProducts(GetFilteredRequest request) {
        List<ProductEntity> products = (request.category() != null && !request.category().isBlank())
                ? productRepository.findByCategory(request.category())
                : productRepository.findAll();

        if (request.stockStatus() == null) {
            return products;
        }

        return products.stream()
                .filter(product -> {
                    BigDecimal stock = product.getStock();
                    BigDecimal lowStockThreshold = product.getLowStockThreshold();

                    if (stock == null) {
                        return false;
                    }

                    return switch (request.stockStatus()) {
                        case NO_STOCK -> stock.compareTo(BigDecimal.ZERO) == 0;
                        case LOW_STOCK -> lowStockThreshold != null && stock.compareTo(BigDecimal.ZERO) > 0
                                && stock.compareTo(lowStockThreshold) <= 0;
                        case ABOVE_THRESHOLD -> lowStockThreshold != null && stock.compareTo(lowStockThreshold) > 0;
                    };
                })
                .toList();
    }
}
