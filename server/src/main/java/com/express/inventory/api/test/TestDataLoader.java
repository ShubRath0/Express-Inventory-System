package com.express.inventory.api.test;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class TestDataLoader {

    @Bean
    CommandLineRunner loadTestData(TestRepository repository) {
        return args -> {
            repository.saveAll(List.of(
                    new TestEntity(1, "A"),
                    new TestEntity(2, "B"),
                    new TestEntity(3, "C"),
                    new TestEntity(4, "D")));
        };
    }
}
