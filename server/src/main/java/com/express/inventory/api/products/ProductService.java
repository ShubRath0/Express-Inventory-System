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

import com.express.inventory.api.logs.InventoryLogRepository;
import com.express.inventory.api.logs.InventoryTransaction;
import com.express.inventory.api.logs.enums.InventoryActionType;
import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.GetFilteredRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.api.products.dto.response.ProductResponse;
import com.express.inventory.api.products.dto.response.ProductSummaryResponse;
import com.express.inventory.api.products.exception.ProductNotFoundException;
import com.express.inventory.common.utility.Utilities;
import com.opencsv.bean.CsvToBeanBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryLogRepository inventoryLogRepository;

    // Create Product
    @Transactional
    public Product createProduct(CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.name())
                .category(request.category())
                .lowStockThreshold(request.lowStockThreshold())
                .price(request.price())
                .stock(request.stock()).build();
        return productRepository.save(product);
    }

    @Transactional
    public List<Product> createProductsFromCsv(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<Product> products = new CsvToBeanBuilder<Product>(reader)
                    .withType(Product.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            return productRepository.saveAll(products);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }

    // Read Product(s)
    // first getAllProducts could be changed to private since pagination handles it,
    // still here just in case and because of java app test
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Product> searchProduct(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Transactional(readOnly = true)
    public Product getProductById(Integer id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) {
            throw new ProductNotFoundException();
        }

        return product.get();
    }

    // Update Product
    @Transactional
    public Product updateProduct(UpdateProductRequest request, Integer id) {
        Product product = getProductById(id);
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

    // Stock Changes and Log Creation
    @Transactional
    public void updateStock(Integer productId, BigDecimal stockChange, InventoryActionType actionType, String note) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException());

        // Update stock
        BigDecimal currentStock = product.getStock() != null
                ? product.getStock()
                : BigDecimal.ZERO;
        product.setStock(currentStock.add(stockChange));

        // Create log
        InventoryTransaction log = new InventoryTransaction();
        log.setProduct(product);
        log.setStockChange(stockChange);
        log.setActionType(actionType);
        log.setNote(note);
        inventoryLogRepository.save(log);
    }

    // Filter Products
    @Transactional(readOnly = true)
    public List<Product> filterProducts(GetFilteredRequest request) {
        List<Product> products = (request.category() != null && !request.category().isBlank())
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

    // Pagination
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    private ProductResponse mapToResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getStock(),
                product.getLowStockThreshold());
    }

    // Product Summary
    @Transactional(readOnly = true)
    public ProductSummaryResponse getProductSummary() {
        List<Product> products = productRepository.findAll();
        long totalProducts = products.size();
        BigDecimal totalStock = BigDecimal.ZERO;
        BigDecimal totalUnitPrice = BigDecimal.ZERO;
        BigDecimal totalInventoryValue = BigDecimal.ZERO;

        // Enhanced for loop || For-each loop
        for (Product product : products) {
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
                totalInventoryValue);
    }

    // List Category Name
    @Transactional(readOnly = true)
    public List<Product> getAllCategories() {
        List<Product> products = productRepository.findAllCategories();
        return products;
    }

    // List Recently Added Products
    @Transactional(readOnly = true)
    public List<Product> getRecentlyAddedProducts() {
        List<Product> products = productRepository.findTop5ByOrderByCreatedAtDesc();
        return products;
    }
}
