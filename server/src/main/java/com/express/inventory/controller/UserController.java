package com.express.inventory.controller;

import com.express.inventory.models.User;
import com.express.inventory.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //  all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        logger.info("Fetching all users...");
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            logger.warn("No users found in the system.");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    //  user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        logger.info("Fetching user with ID: {}", id);
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> {
                       logger.error("User with ID {} not found", id);
                       return ResponseEntity.notFound().build();
                   });
    }

    // create user
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestParam String username,
                                           @RequestParam String password) {
        logger.info("Creating user with username: {}", username);
        User newUser = userService.createUser(username, password);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    //  update user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestParam(required = false) String username,
                                           @RequestParam(required = false) String password) {
        logger.info("Updating user with ID: {}", id);
        try {
            User updatedUser = userService.updateUser(id, username, password);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            logger.error("Error updating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // partial update 
    @PatchMapping("/{id}")
    public ResponseEntity<User> partialUpdateUser(@PathVariable Long id,
                                                  @RequestBody User partialUser) {
        logger.debug("Partially updating user ID: {}", id);
        User updated = userService.partialUpdateUser(id, partialUser);
        return ResponseEntity.ok(updated);
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        logger.warn("Deleting user with ID: {}", id);
        String response = userService.deleteUser(id);
        return ResponseEntity.ok(response);
    }

    // Find user by username
    @GetMapping("/search")
    public ResponseEntity<Optional<User>> findUserByUsername(@RequestParam String username) {
        logger.info("Searching user with username: {}", username);
        Optional<User> user = userService.findByUsername(username);
        return user.isPresent() ? ResponseEntity.ok(user)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
