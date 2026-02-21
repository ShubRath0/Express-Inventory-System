package com.express.inventory.db;

public class DbConstants {
    public static final String DRIVER_CLASS = "com.mysql.cj.jdbc.Driver";
    public static final String HOST = "express-inventory-dev.c9kggwm2mug3.us-east-2.rds.amazonaws.com";
    public static final int PORT = 3306;
    public static final String DB_NAME = "express_inventory_dev";
    public static final String URL = "jdbc:mysql://" + HOST + ":" + PORT + "/" + DB_NAME;
    public static final String USERNAME = "root";
    public static final String PASSWORD = "12345678";
}
