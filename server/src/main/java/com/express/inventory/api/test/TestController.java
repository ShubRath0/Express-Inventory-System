package com.express.inventory.api.test;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    TestService service;

    public TestController(TestService service) {
        this.service = service;
    }

    @GetMapping()
    public List<TestEntity> getTestEntities() {
        return service.getAll();
    }
}
