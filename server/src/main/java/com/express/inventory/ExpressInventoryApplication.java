package com.express.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ExpressInventoryApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        setEnvIfPresent("DB_URL", dotenv);
        setEnvIfPresent("DB_USERNAME", dotenv);
        setEnvIfPresent("DB_PASSWORD", dotenv);
        SpringApplication.run(ExpressInventoryApplication.class, args);
    }

    private static void setEnvIfPresent(String key, Dotenv dotenv) {
        String value = dotenv.get(key);
        if (value != null) {
            System.setProperty(key, value);
        }
    }

}