package com.express.inventory.dto.products.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

public record CreateProductRequest(

    @NotBlank(message = "Name cannot be blank")
    @Size(min = 1, max = 100, message = "Name must be at least 1 character and no more than 100")
    String name,

    @NotBlank(message = "Product type cannot be blank")
    @Size(min = 1, max = 500, message = "Product type must be at least 1 character and no more than 500")
    String productType,

    @NotNull(message = "Stock cannot be null")
    @Min(value = 1, message = "Stock must be greater than 0")
    int stock,

    @NotNull(message = "Stock threshold cannot be null")
    @Min(value = 1, message = "Stock threshold must be grater than 0")
    Double stockThreshold,

    @NotNull(message = "Price cannot be null")
    @Min(value = 1, message = "Price should be greater than 0")
    Double price) {}
