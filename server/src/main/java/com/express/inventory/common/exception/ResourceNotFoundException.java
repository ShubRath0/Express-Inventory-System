package com.express.inventory.common.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Class<?> entity, Object id) {
        super(entity.getSimpleName() + " with id " + id + " was not found");
    }
}
