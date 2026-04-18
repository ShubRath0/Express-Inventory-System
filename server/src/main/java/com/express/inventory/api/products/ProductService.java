package com.express.inventory.api.products;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.multipart.MultipartFile;

import com.express.inventory.api.audit.enums.Action;
import com.express.inventory.api.logs.events.InventoryTransactionEvent;
import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.GetFilteredRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.api.products.dto.request.UpdateStockRequest;
import com.express.inventory.api.products.dto.response.ProductResponse;
import com.express.inventory.api.products.dto.response.ProductSummaryResponse;
import com.express.inventory.api.products.events.StockUpdatedEvent;
import com.express.inventory.common.aspects.audit.Audit;
import com.express.inventory.common.exception.ResourceNotFoundException;
import com.express.inventory.common.utility.Utilities;
import com.opencsv.bean.CsvToBeanBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ProductMapper productMapper;

    // -------------------
    // EVENTS
    // -------------------

    // Event listener, listens to the StockUpdatedEvent
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    @Transactional(propagation = Propagation.REQUIRED)
    public void updateStockEvent(StockUpdatedEvent event) {
        Product product = productRepository.findById(event.productId())
                .orElseThrow(() -> new ResourceNotFoundException(Product.class, event.productId()));

        product.setStock(product.getStock().add(event.quantity()));
        productRepository.save(product);
    }

    // -------------------
    // METHODS / CRUD
    // -------------------

    // GET products
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(productMapper::toDTO);
    }

    // CREATE products
    @Transactional
    @Audit(action = Action.CREATE, entity = Product.class)
    public ProductResponse createProduct(CreateProductRequest request) {
        Product product = productMapper.toProduct(request);
        return productMapper.toDTO(productRepository.save(product));
    }

    // BULK CREATE products
    @Transactional
    @Audit(action = Action.BULK_CREATE, entity = Product.class)
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

    // FILTERING
    @Transactional(readOnly = true)
    public List<Product> searchProduct(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    // GET by ID
    @Transactional(readOnly = true)
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Product.class, id));
    }

    // UPDATE product
    @Transactional
    @Audit(action = Action.UPDATE, entity = Product.class)
    public Product updateProduct(UpdateProductRequest request, Integer id) {
        Product product = getProductById(id);
        Utilities.copyNonNullProperties(request, product);
        return productRepository.save(product);
    }

    // DELETE Product
    @Transactional
    @Audit(action = Action.DELETE, entity = Product.class)
    public void deleteProduct(Integer id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    // DELETE all products
    @Transactional
    @Audit(action = Action.BULK_DELETE, entity = Product.class)
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    // UPDATE only stock / create inventory log
    @Transactional
    public void updateStock(UpdateStockRequest request) {
        Product product = getProductById(request.productId());

        // Update stock
        BigDecimal currentStock = product.getStock() != null
                ? product.getStock()
                : BigDecimal.ZERO;
        product.setStock(currentStock.add(request.stockChange()));

        eventPublisher.publishEvent(
                new InventoryTransactionEvent(product, request.stockChange(), request.actionType(), request.note()));
    }

    // FILTER Products
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

    // -------------------
    // DERIVED DATA
    // -------------------

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
