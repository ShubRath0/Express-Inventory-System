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

import com.express.inventory.api.audit.enums.Action;
import com.express.inventory.api.logs.InventoryLogRepository;
import com.express.inventory.api.logs.InventoryTransaction;
import com.express.inventory.api.logs.enums.InventoryActionType;
import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.GetFilteredRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.api.products.dto.response.ProductResponse;
import com.express.inventory.api.products.dto.response.ProductSummaryResponse;
import com.express.inventory.api.products.exception.ProductNotFoundException;
import com.express.inventory.common.aspects.audit.Audit;
import com.express.inventory.common.utility.Utilities;
import com.opencsv.bean.CsvToBeanBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryLogRepository inventoryLogRepository;
    private final ProductMapper productMapper;

    @Transactional
    @Audit(action = Action.CREATE, entity = Product.class)
    public ProductResponse createProduct(CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.name())
                .category(request.category())
                .lowStockThreshold(request.lowStockThreshold())
                .price(request.price())
<<<<<<< HEAD
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
=======
                .stock(request.stock()).build();
        return productMapper.toDTO(productRepository.save(product));
>>>>>>> master
    }

    @Transactional
    @Audit(action = Action.BULK_CREATE, entity = Product.class)
    public List<Product> createProductsFromCsv(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<Product> products = new CsvToBeanBuilder<Product>(reader)
                    .withType(Product.class)
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

<<<<<<< HEAD
=======
    // Read Product(s)
    // first getAllProducts could be changed to private since pagination handles it,
    // still here just in case and because of java app test
>>>>>>> master
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

    @Transactional
<<<<<<< HEAD
    public ProductEntity updateProduct(UpdateProductRequest request, Integer id) {
        ProductEntity product = getProductById(id);

        BigDecimal oldStock = product.getStock() != null ? product.getStock() : BigDecimal.ZERO;

=======
    @Audit(action = Action.UPDATE, entity = Product.class)
    public Product updateProduct(UpdateProductRequest request, Integer id) {
        Product product = getProductById(id);
>>>>>>> master
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
    @Audit(action = Action.DELETE, entity = Product.class)
    public void deleteProduct(Integer id) {
        try {
            productRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new ProductNotFoundException();
        }
    }

    @Transactional
    @Audit(action = Action.BULK_DELETE, entity = Product.class)
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

<<<<<<< HEAD
    @Transactional
    public void updateStock(Integer productId, BigDecimal stockChange, InventoryActionType actionType, String note) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(ProductNotFoundException::new);

        BigDecimal currentStock = product.getStock() != null ? product.getStock() : BigDecimal.ZERO;
        BigDecimal change = stockChange != null ? stockChange : BigDecimal.ZERO;

        product.setStock(currentStock.add(change));
        ProductEntity updatedProduct = productRepository.save(product);

        InventoryLogEntity log = new InventoryLogEntity();
        log.setProduct(updatedProduct);
        log.setStockChange(change);
=======
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
>>>>>>> master
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
                        case LOW_STOCK -> lowStockThreshold != null
                                && stock.compareTo(BigDecimal.ZERO) > 0
                                && stock.compareTo(lowStockThreshold) <= 0;
                        case ABOVE_THRESHOLD -> lowStockThreshold != null
                                && stock.compareTo(lowStockThreshold) > 0;
                    };
                })
                .toList();
    }
<<<<<<< HEAD
}
=======

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
>>>>>>> master
