package com.express.inventory.api.dto;

public class ApiResponse {
    private boolean success;

    public ApiResponse(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public boolean getSuccess() {
        return this.success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
