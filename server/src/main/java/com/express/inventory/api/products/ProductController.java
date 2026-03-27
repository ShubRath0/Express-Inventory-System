package com.express.inventory.api.products;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.express.inventory.api.products.dto.request.CreateProductRequest;
import com.express.inventory.api.products.dto.request.UpdateProductRequest;
import com.express.inventory.common.dto.ApiResponse;

import jakarta.validation.Valid;

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

    @PostMapping("/csv")
    public ResponseEntity<ApiResponse<List<ProductEntity>>> createProductsWithCsv(
            @RequestParam MultipartFile file) {
        List<ProductEntity> products = productService.createProductsFromCsv(file);
        return ApiResponse.success(HttpStatus.CREATED, "Products created successfully!", products);
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
        return ApiResponse.success(HttpStatus.OK, "All products have been deleted!", null);
    }
}
