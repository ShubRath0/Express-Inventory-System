package com.express.inventory.api.test;

public class TestSQL {
    public static final String GET_ALL = "SELECT * FROM test_entity";
    public static final String CREATE_ENTITY = "INSERT INTO test_entity (name) VALUES (?)";
    public static final String CREATE_TABLE = "CREATE TABLE test_entity (" +
            "id INT AUTO_INCREMENT PRIMARY KEY, " +
            "name VARCHAR(255) NOT NULL" +
            ")";
}
