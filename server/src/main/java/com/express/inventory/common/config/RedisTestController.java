package com.express.inventory.common.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class RedisTestController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello! If you see this message, you are within rate limit.";
    }
}
