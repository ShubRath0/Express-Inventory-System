package com.express.inventory.exceptions;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.express.inventory.dto.common.ApiResponse;
import com.express.inventory.dto.common.FieldError;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(InvalidPurchaseException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidPurchase(InvalidPurchaseException ex) {
        logger.error("Invalid purchase data", ex);
        return ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
    }

    @ExceptionHandler(PurchaseNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handlePurchaseNotFound(PurchaseNotFoundException ex) {
        logger.error("Purchase not found", ex);
        return ApiResponse.error(HttpStatus.NOT_FOUND, ex.getMessage(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<FieldError> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> new FieldError(e.getField(), e.getDefaultMessage()))
                .toList();

        return ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation failed", fieldErrors);
    }


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRunTime(RuntimeException ex) {
        logger.error("Unexpected server error occurred", ex);
        return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", null);
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

