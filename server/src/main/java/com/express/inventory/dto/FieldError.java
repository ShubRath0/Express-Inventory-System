package com.express.inventory.dto;

/**
 * Data Transfer Object representing a validation error on a specific field.
 * Used to provide clear feedback to the client when a request fails validation.
 */
public record FieldError(
        String field,
        String message) {

}
