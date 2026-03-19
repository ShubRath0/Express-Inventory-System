package com.express.inventory.controllers;

import com.express.inventory.dto.common.ApiResponse;
import com.express.inventory.dto.products.request.CreateProductRequest;
import com.express.inventory.dto.products.request.UpdateProductRequest;
import com.express.inventory.models.ProductEntity;
import com.express.inventory.services.ProductService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Create Product
    @PostMapping
    public ResponseEntity<ApiResponse<ProductEntity>> createProduct(
            @Valid @RequestBody CreateProductRequest request) {
        ProductEntity createdProduct = productService.createProduct(request);
        return ApiResponse.success(HttpStatus.CREATED, "Product created successfully!", createdProduct);
    }

    // Read Product
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductEntity>>> getAllProducts() {
        return ApiResponse.success(HttpStatus.OK, "Products retreived successfully!", productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductEntity>> getProductById(@PathVariable Integer id) {
        return ApiResponse.success(HttpStatus.OK, "Product retreived successfully!", productService.getProductById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductEntity>>> searchProduct(@RequestParam String keyword) {
        return ApiResponse.success(HttpStatus.OK, "Products retreived successfully!",
                productService.searchProduct(keyword));
    }

    // Update Product
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductEntity>> updateProduct(
            @PathVariable Integer id, @RequestBody UpdateProductRequest request) {
        ProductEntity updatedProduct = productService.updateProduct(request, id);
        return ApiResponse.success(HttpStatus.OK, "Product updated successfully!", updatedProduct);
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
        ;
        return ApiResponse.success(HttpStatus.OK, "All products have been deleted!", null);
    }
}
