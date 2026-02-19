package com.express.inventory.api.test;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TestService {
    private final TestRepository repository;

    public TestService(TestRepository repository) {
        this.repository = repository;
    }

    public List<TestEntity> getAll() {
        return repository.findAll();
    }

    public TestEntity createTestEntity(String name) {
        return repository.createTestEntity(name);
    }
}
