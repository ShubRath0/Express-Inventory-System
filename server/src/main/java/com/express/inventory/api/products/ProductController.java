package com.express.inventory.api.products;

import com.express.inventory.api.products.dto.CreateProductRequest;
import com.express.inventory.api.products.dto.UpdateProductRequest;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Create Product
    @PostMapping
    public ResponseEntity<ProductEntity> createProduct(
            @Valid @RequestBody CreateProductRequest request
    ) {
        ProductEntity createdProduct = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    // Read Product
    @GetMapping
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable int id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductEntity>> searchProduct(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProduct(keyword));
    }

    // Update Product
    @PutMapping("/{id}")
    public ResponseEntity<ProductEntity> updateProduct(
        @PathVariable int id, @RequestBody UpdateProductRequest request
    ) {
        ProductEntity updatedProduct = productService.updateProduct(request);
        return ResponseEntity.ok(updatedProduct);
    }

    /* @PatchMapping("/{id}")
    public ResponseEntity<ProductEntity> partiallyUpdateProduct(
        @PathVariable int id, @RequestBody Map<String, Object> updates
    ) {
        ProductEntity updatedProduct = productService.updateProduct(request);
        return ResponseEntity.ok(productService.partiallyUpdateProduct(id));
    } */

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
