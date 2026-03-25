package com.express.inventory.exceptions;

public class InvalidPurchaseException extends RuntimeException {
    public InvalidPurchaseException(String message) {
        super(message);
    }

        public InvalidPurchaseException() {
        super("Invalid purchase request. Please check the provided details and try again.");
    }
}