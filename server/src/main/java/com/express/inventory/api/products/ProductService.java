package com.express.inventory.api.products;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.express.inventory.api.logs.InventoryLogEntity;
import com.express.inventory.api.logs.InventoryLogRepository;
import com.express.inventory.api.logs.enums.InventoryActionType;
import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.GetFilteredRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.api.products.dto.response.ProductResponse;
import com.express.inventory.api.products.dto.response.ProductSummaryResponse;
import com.express.inventory.api.products.exception.ProductNotFoundException;
import com.express.inventory.utility.Utilities;
import com.opencsv.bean.CsvToBeanBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryLogRepository inventoryLogRepository;

    @Transactional
    public ProductEntity createProduct(CreateProductRequest request) {
        ProductEntity product = ProductEntity.builder()
                .name(request.name())
                .category(request.category())
                .lowStockThreshold(request.lowStockThreshold())
                .price(request.price())
                .stock(request.stock())
                .build();

        ProductEntity savedProduct = productRepository.save(product);

        InventoryLogEntity log = new InventoryLogEntity();
        log.setProduct(savedProduct);
        log.setStockChange(savedProduct.getStock() != null ? savedProduct.getStock() : BigDecimal.ZERO);
        log.setActionType(InventoryActionType.ADD);
        log.setNote("Product created");

        inventoryLogRepository.save(log);

        return savedProduct;
    }

    @Transactional
    public List<ProductEntity> createProductsFromCsv(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<ProductEntity> products = new CsvToBeanBuilder<ProductEntity>(reader)
                    .withType(ProductEntity.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            List<ProductEntity> savedProducts = productRepository.saveAll(products);

            for (ProductEntity product : savedProducts) {
                InventoryLogEntity log = new InventoryLogEntity();
                log.setProduct(product);
                log.setStockChange(product.getStock() != null ? product.getStock() : BigDecimal.ZERO);
                log.setActionType(InventoryActionType.ADD);
                log.setNote("Product imported from CSV");

                inventoryLogRepository.save(log);
            }

            return savedProducts;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }

    // Read Product(s)
    // first getAllProducts could be changed to private since pagination handles it, 
    // still here just in case and because of java app test
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

    @Transactional
    public ProductEntity updateProduct(UpdateProductRequest request, Integer id) {
        ProductEntity product = getProductById(id);

        BigDecimal oldStock = product.getStock() != null ? product.getStock() : BigDecimal.ZERO;

        Utilities.copyNonNullProperties(request, product);
        ProductEntity updatedProduct = productRepository.save(product);

        BigDecimal newStock = updatedProduct.getStock() != null ? updatedProduct.getStock() : BigDecimal.ZERO;

        InventoryLogEntity log = new InventoryLogEntity();
        log.setProduct(updatedProduct);
        log.setStockChange(newStock.subtract(oldStock));
        log.setActionType(InventoryActionType.UPDATE);
        log.setNote("Product updated");

        inventoryLogRepository.save(log);

        if (updatedProduct.getLowStockThreshold() != null
                && newStock.compareTo(updatedProduct.getLowStockThreshold()) <= 0) {

            InventoryLogEntity lowStockLog = new InventoryLogEntity();
            lowStockLog.setProduct(updatedProduct);
            lowStockLog.setStockChange(BigDecimal.ZERO);
            lowStockLog.setActionType(InventoryActionType.UPDATE);
            lowStockLog.setNote("Product is low in stock");

            inventoryLogRepository.save(lowStockLog);
        }

        return updatedProduct;
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

    // Stock Changes and Log Creation
    @Transactional
    public void updateStock(Integer productId, BigDecimal stockChange, InventoryActionType actionType, String note) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        // Update stock
        BigDecimal currentStock = product.getStock() != null 
            ? product.getStock() 
            : BigDecimal.ZERO;
        product.setStock(currentStock.add(stockChange));
        // productRepository.save(product); <-- not fully required anymore, might delete later

        InventoryLogEntity log = new InventoryLogEntity();
        log.setProduct(updatedProduct);
        log.setStockChange(change);
        log.setActionType(actionType);
        log.setNote(note);
        inventoryLogRepository.save(log);

        if (updatedProduct.getLowStockThreshold() != null
                && updatedProduct.getStock() != null
                && updatedProduct.getStock().compareTo(updatedProduct.getLowStockThreshold()) <= 0) {

            InventoryLogEntity lowStockLog = new InventoryLogEntity();
            lowStockLog.setProduct(updatedProduct);
            lowStockLog.setStockChange(BigDecimal.ZERO);
            lowStockLog.setActionType(InventoryActionType.UPDATE);
            lowStockLog.setNote("Product is low in stock");

            inventoryLogRepository.save(lowStockLog);
        }
    }

    // Filter Products
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
                        case LOW_STOCK -> lowStockThreshold != null
                                && stock.compareTo(BigDecimal.ZERO) > 0
                                && stock.compareTo(lowStockThreshold) <= 0;
                        case ABOVE_THRESHOLD -> lowStockThreshold != null
                                && stock.compareTo(lowStockThreshold) > 0;
                    };
                })
                .toList();
    }

    // Pagination
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    private ProductResponse mapToResponse(ProductEntity product) {
        return new ProductResponse(
            product.getId(),
            product.getName(),
            product.getCategory(),
            product.getPrice(),
            product.getStock(),
            product.getLowStockThreshold()
        );
    }

    // Product Summary
    @Transactional(readOnly = true)
    public ProductSummaryResponse getProductSummary() {
        List<ProductEntity> products = productRepository.findAll();
        long totalProducts = products.size();
        BigDecimal totalStock = BigDecimal.ZERO;
        BigDecimal totalUnitPrice = BigDecimal.ZERO;
        BigDecimal totalInventoryValue = BigDecimal.ZERO;

        // Enhanced for loop || For-each loop
        for (ProductEntity product : products) {
            BigDecimal stock = product.getStock() != null 
                    ? product.getStock() 
                    : BigDecimal.ZERO;

            BigDecimal price = product.getPrice() != null 
                    ? product.getPrice() 
                    : BigDecimal.ZERO;

            totalStock = totalStock.add(stock);
            totalUnitPrice = totalUnitPrice.add(price);

            // total inventory value = price * stock
            totalInventoryValue = totalInventoryValue.add(price.multiply(stock));
        }

        return new ProductSummaryResponse(
            totalProducts,
            totalStock,
            totalUnitPrice,
            totalInventoryValue
        );
    }
}
