package com.express.inventory.dto;

import java.time.Instant;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * Standard API response wrapper used for all REST endpoints.
 * 
 * <p>
 * This class provides a consistent response structure for both successful and
 * failed API requests. It ensures that all responses contain metadata such as
 * timestamps, HTTP status codes, request path, and optional payload or
 * validation errors.
 * </p>
 * 
 * <p>
 * Example structure:
 * </p>
 * 
 * <pre>
 * {
 *     "timestamp": "2026-03-14T23:55:10Z",
 *     "status": 200,
 *     "success": true,
 *     "error": null,
 *     "message": "Service is healthy",
 *     "path": "/api/v1/health",
 *     "data": {
 *         "status": "UP",
 *         "uptime": "12 hours 34 minutes",
 *         "version": "1.0.0"
 *     },
 *     "fieldErrors": null
 * }
 * </pre>
 * 
 * @param <T> The type of response payload returned by the API.
 */
public record ApiResponse<T>(
        Instant timestamp,
        int status,
        boolean success,
        String error,
        String message,
        String path,
        T data,
        List<FieldError> fieldErrors) {

    /**
     * Creates a successful API response.
     * 
     * <p>
     * This method should be used when an API completes successfully and returns
     * data.
     * </p>
     * 
     * @param <T>            The type of the response payload.
     * @param status         The HTTP status of the response.
     * @param servletRequest The HTTP request used to extract the request path.
     * @param message        A human-readable message describing the result.
     * @param data           The response payload returned by the API.
     * @return A {@link ResponseEntity} containing a successful {@link ApiResponse}
     *         wrapping the data
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(
            HttpStatus status,
            String message,
            T data) {

        String path = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .build()
                .getPath();

        ApiResponse<T> apiResponse = new ApiResponse<T>(
                Instant.now(),
                status.value(),
                true,
                null,
                message,
                path,
                data,
                null);

        return ResponseEntity.status(status).body(apiResponse);
    }

    /**
     * Creates an error API response.
     * 
     * <p>
     * This method should be used when a request fails due to validation errors,
     * exceptions, or other server-side issues.
     * </p>
     * 
     * @param <T>            The generic response type (Typically unused for errors)
     * @param status         The HTTP status representing the failure.
     * @param servletRequest The HTTP request used to extract the request path
     * @param message        A human-readable description of the error.
     * @param fieldErrors    A map containing field-specific validation errors where
     *                       the key is the field name and the value is the error
     *                       message.
     * @return A {@link ResponseEntity} containing an {@link ApiResponse} formatted
     *         for error delivery
     */
    public static <T> ResponseEntity<ApiResponse<T>> error(
            HttpStatus status,
            String message,
            List<FieldError> fieldErrors) {

        String path = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .build()
                .getPath();

        ApiResponse<T> apiResponse = new ApiResponse<T>(
                Instant.now(),
                status.value(),
                false,
                status.getReasonPhrase(),
                message,
                path,
                null,
                fieldErrors);

        return ResponseEntity.status(status).body(apiResponse);
    }

    /**
     * Creates a basic error API response without field-specific details.
     * 
     * <p>
     * Convenience method that calls {@link #error(HttpStatus, String, List)} with
     * null field errors.
     * </p>
     * 
     * @param status  The {@link HttpStatus} representing the failure.
     * 
     * @param message A human-readable description of the error.
     * @return A {@link ResponseEntity} containing a basic error
     *         {@link ApiResponse}.
     */
    public static <T> ResponseEntity<ApiResponse<T>> error(
            HttpStatus status,
            String message) {
        return error(status, message, null);
    }
}
