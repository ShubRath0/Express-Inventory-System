package com.express.inventory.api.products;

public class ProductSQL {
    public static final String GET_ALL = "SELECT * FROM products_entity";
    public static final String GET_BY_ID = "SELECT * FROM products_entity WHERE (id) = (?)";
    public static final String CREATE_ENTITY = "INSERT INTO products_entity (" +
        "";
    public static final String CREATE_TABLE = "CREATE TABLE products_entity (" +
        "id INT AUTO_INCREMENT PRIMARY KEY, " +
        "name VARCHAR(150) NOT NULL" +
        "productType VARCHAR(500) NOT NULL" +
        "stockThreshold DOUBLE PRECISION NOT NULL" +
        "price NUMERIC(10, 2) NOT NULL" +
        "stock INT NOT NULL" +
        "created_at TIMESTAMP" +
        "updated_at TIMESTAMP" +
        ")";
}
