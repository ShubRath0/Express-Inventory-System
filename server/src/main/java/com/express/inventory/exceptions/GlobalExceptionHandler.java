package com.express.inventory.exceptions;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.express.inventory.dto.ApiResponse;
import com.express.inventory.dto.FieldError;

/**
 * Global exception handler for the application.
 * 
 * <p>
 * This class centralizes exception handling across all REST controllers and
 * converts thrown exceptions into standardized {@link ApiResponse} structure.
 * Using a global handler ensures consistent error responses throughout the API.
 * </p>
 * 
 * <p>
 * Handled exceptions include:
 * </p>
 * 
 * <ul>
 * <li>{@link RuntimeException} - fallback handler for unexpected server
 * errors.</li>
 * <li>{@link MethodArgumentNotValidException} - triggered when request body
 * validation fails.</li>
 * </ul>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles unexpected runtime exceptions.
     * 
     * <p>
     * This serves as a fallback error for uncaught exceptions occuring within the
     * application. It returns a generic {@code 500 Internal Server Error} response.
     * </p>
     * 
     * @param ex The thrown runtime exception.
     * @return a {@link ResponseEntity} containing a standardized
     *         {@link ApiResponse} describing the error.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRunTime(RuntimeException ex) {
        return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null);
    }

    /**
     * Handles validation errors triggered by {@code @Valid} annotated request
     * bodies.
     * 
     * <p>
     * This exception is thrown by Spring when request body validation fails. Each
     * validation error is extracted and mapped into a {@link FieldError} object
     * which is returned to the client.
     * </p>
     * 
     * @param ex The validation exception containing field error details.
     * @return a {@link ResponseEntity} containing a {@link ApiResponse} with
     *         validation error information.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<FieldError> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> new FieldError(e.getField(), e.getDefaultMessage()))
                .toList();

        return createResponse(HttpStatus.BAD_REQUEST, "Validation failed", fieldErrors);
    }

    /**
     * Helper method used to construct standardized API error responses.
     * 
     * <p>
     * This method centralizes the logic for building {@link ApiResponse} objects
     * and wrapping them in a {@link ResponseEntity} with the appropriate HTTP
     * status code.
     * </p>
     * 
     * @param status      The HTTP status to return.
     * @param message     A human-readable description of the error.
     * @param fieldErrors A list of validation errors, or {@code null} if none
     *                    exist.
     * @return A {@link ResponseEntity} containing the formatted
     *         {@link ApiResponse}.
     */
    private ResponseEntity<ApiResponse<Void>> createResponse(
            HttpStatus status,
            String message,
            List<FieldError> fieldErrors) {
        return ResponseEntity.status(status).body(ApiResponse.error(status, message, fieldErrors));
    }
}
