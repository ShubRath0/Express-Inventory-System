package com.express.inventory.api.products;

public class ProductSQL {
    public static final String GET_ALL = "SELECT * FROM products";
    public static final String GET_BY_ID = "SELECT * FROM products WHERE (id) = (?)";
    public static final String PRODUCT_SEARCH_QUERY = "SELECT * FROM products WHERE name LIKE ?";
    public static final String CREATE_ENTITY = "INSERT INTO products (" +
        "name, productType, stockThreshold, price, stock" + 
        ")" +
        "VALUES (" +
        "?, ?, ?, ?, ?" +
        ")";
    public static final String CREATE_TABLE = "CREATE TABLE products (" +
        "id INT AUTO_INCREMENT PRIMARY KEY, " +
        "name VARCHAR(150) NOT NULL, " +
        "productType VARCHAR(100) NOT NULL, " +
        "stockThreshold DOUBLE NOT NULL, " +
        "price DECIMAL(10, 2) NOT NULL, " +
        "stock INT NOT NULL, " +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
        "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP " +
        ")";
    public static final String UPDATE_ENTITY = "UPDATE products" + 
        "SET name = (?)," +
        "    productType = (?)," +
        "    stockThreshold = (?)," +
        "    price = (?)," +
        "    stock = (?)" +
        "WHERE (id) = (?)";
    public static final String DELETE_ENTITY = "DELETE FROM products WHERE (id) = (?)";
}
