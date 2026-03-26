package com.express.inventory;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.express.inventory.services.ProductService;

@SpringBootTest
public class ExpressInventoryApplicationTests {

    @Autowired
    private ProductService productService;

    @Test
    void contextLoads() {
        try {
            productService.getAllProducts();
            System.out.println("Database Connection Verified!");
        } catch (Exception e) {
            System.out.println("Database Connection Failed: " + e.getMessage());
            throw e;
        }
    }
}
