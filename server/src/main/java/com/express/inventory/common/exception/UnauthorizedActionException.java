package com.express.inventory.common.exception;

public class UnauthorizedActionException extends RuntimeException {
    public UnauthorizedActionException() {
        super("You are not authorized to perform this action");
    }
}
