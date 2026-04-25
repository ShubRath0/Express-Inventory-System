package com.express.inventory.api.products;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.GetFilteredRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.api.products.dto.request.UpdateStockRequest;
import com.express.inventory.api.products.dto.response.ProductResponse;
import com.express.inventory.api.products.dto.response.ProductSummaryResponse;
import com.express.inventory.common.dto.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    private static final Logger log = LoggerFactory.getLogger(ProductController.class);

    // Create Product
    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @Valid @RequestBody CreateProductRequest request) {
        ProductResponse createdProduct = productService.createProduct(request);
        return ApiResponse.success(HttpStatus.CREATED, "Product created successfully!", createdProduct);
    }

    @PostMapping("/csv")
    public ResponseEntity<ApiResponse<List<Product>>> createProductsWithCsv(
            @RequestParam MultipartFile file) {
        List<Product> products = productService.createProductsFromCsv(file);
        return ApiResponse.success(HttpStatus.CREATED, "Products created successfully!", products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Integer id) {
        return ApiResponse.success(HttpStatus.OK, "Product retrieved successfully!", productService.getProductById(id));
    }

    // Update Product
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable Integer id, @RequestBody UpdateProductRequest request) {
        Product updatedProduct = productService.updateProduct(request, id);
        return ApiResponse.success(HttpStatus.OK, "Product updated successfully!", updatedProduct);
    }

    @PatchMapping("/{id}/update-stock")
    public ResponseEntity<ApiResponse<Void>> updateStock(
            @PathVariable Integer id, @RequestBody @Valid UpdateStockRequest request) {
        productService.updateStock(id, request);
        return ApiResponse.success(HttpStatus.OK, "Product updated successfully!", null);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ApiResponse.success(HttpStatus.OK, "Product deleted successfully!", null);
    }

    @DeleteMapping("/DELETE_EVERY_SINGLE_PRODUCT")
    public ResponseEntity<ApiResponse<Void>> deleteAllproducts() {
        productService.deleteAllProducts();
        return ApiResponse.success(HttpStatus.OK, "All products have been deleted!", null);
    }

    // Get products
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getAllProducts(
            @PageableDefault(page = 0, size = 10) @ParameterObject Pageable pageable,
            @ParameterObject @ModelAttribute GetFilteredRequest request) {
        Page<ProductResponse> products = productService.getAllProducts(pageable, request);
        log.info("getAllProducts pageable={}, request={}", pageable, request);
        return ApiResponse.success(HttpStatus.OK, "Products retrieved successfully!", products);
    }

    // Product Summary
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<ProductSummaryResponse>> getProductSummary(
            @ParameterObject @ModelAttribute GetFilteredRequest request) {
        ProductSummaryResponse summary = productService.getProductSummary(request);
        return ApiResponse.success(HttpStatus.OK, "Product summary retrieved successfully!", summary);
    }

    // List Category Name
    @GetMapping("/every_category_name")
    public ResponseEntity<ApiResponse<List<Product>>> getAllCategories() {
        List<Product> listCategoryName = productService.getAllCategories();
        return ApiResponse.success(HttpStatus.OK, "Category names retrieved successfully!", listCategoryName);
    }

    // Get 5 Most Recent Added Products
    @GetMapping("/recently_added_products")
    public ResponseEntity<ApiResponse<List<Product>>> getRecentlyAddedProducts() {
        List<Product> listRecentlyAddedProducts = productService.getRecentlyAddedProducts();
        return ApiResponse.success(HttpStatus.OK, "5 most recently added products retrieved successfully!",
                listRecentlyAddedProducts);
    }
}
