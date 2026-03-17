package com.express.inventory.exceptions;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

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
        logger.error("Unexpected server error occured", ex);
        return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", null);
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

        return ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation failed", fieldErrors);
    }

    /**
     * 
     * @param ex
     * @return
     *
     */
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(ProductNotFoundException ex) {
        return ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage());
    }
}
