package com.express.inventory.api.products.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("Product was not found.");
    }
}
