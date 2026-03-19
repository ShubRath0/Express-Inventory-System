package com.express.inventory.controller;

import com.express.inventory.service.UserService;
//import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET all users
    @GetMapping
    public List<String> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET user by ID
    @GetMapping("/{id}")
    public String getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // POST create user
    @PostMapping
    public String createUser(@RequestParam String username) {
        return userService.createUser(username);
    }

    // PUT update user
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id,
                             @RequestParam String username) {
        return userService.updateUser(id, username);
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}