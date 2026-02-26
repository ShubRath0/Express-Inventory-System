package com.express.inventory.api.products;

public class ProductsSQL {
    public static final String GET_ALL = "SELECT * FROM products";
    public static final String GET_BY_ID = "SELECT * FROM products WHERE id = ?";
    public static final String UPDATE_PRODUCT = "UPDATE products SET ";
    public static final String CREATE_PRODUCT = "INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)";
    public static final String DELETE_PRODUCT = "DELETE FROM products WHERE id = ?";
}
