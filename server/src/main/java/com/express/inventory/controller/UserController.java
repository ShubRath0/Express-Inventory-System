package com.express.inventory.controller;

import com.express.inventory.models.User;
import com.express.inventory.service.UserService;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET user by ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // POST create user
@PostMapping
public User createUser(@RequestParam String username,
                       @RequestParam String password) {
    return userService.createUser(username, password);
}


    // PUT update user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                             @RequestParam String username,
                             @RequestParam String password) {
        return userService.updateUser(id, username, password);
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}