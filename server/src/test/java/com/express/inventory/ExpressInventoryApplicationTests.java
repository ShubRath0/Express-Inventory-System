package com.express.inventory;

import java.sql.Connection;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootTest
@ContextConfiguration(initializers = ExpressInventoryApplicationTests.EnvLoader.class)
public class ExpressInventoryApplicationTests {

    @Autowired
    private DataSource dataSource;

    static class EnvLoader implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        @Override
        public void initialize(ConfigurableApplicationContext context) {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            System.setProperty("DB_URL", dotenv.get("DB_URL", ""));
            System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME", ""));
            System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD", ""));
        }
    }

    @Test
    void testConnection() throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("Connected: " + connection.getMetaData().getURL());
        }
    }
}