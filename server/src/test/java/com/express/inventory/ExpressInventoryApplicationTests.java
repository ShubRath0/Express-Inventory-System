package com.express.inventory;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import com.express.inventory.api.products.ProductService;

@SpringBootTest
public class ExpressInventoryApplicationTests {

    @Autowired
    private ProductService productService;

    @Test
    void contextLoads() {
        try {
            productService.getAllProducts(PageRequest.of(0, 10));
            System.out.println("Database Connection Verified!");
        } catch (Exception e) {
            System.out.println("Database Connection Failed: " + e.getMessage());
            throw e;
        }
    }
}
