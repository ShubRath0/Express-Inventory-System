package com.express.inventory.controller;

import com.express.inventory.dto.common.ApiResponse;
import com.express.inventory.dto.users.requests.CreateUserRequest;
import com.express.inventory.dto.users.requests.UpdateUserRequest;
import com.express.inventory.dto.users.requests.PartialUpdateUserRequest;
import com.express.inventory.dto.users.responses.UserResponse;
import com.express.inventory.service.UserService;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ---------------------------------------------------------
    // GET ALL USERS
    // ---------------------------------------------------------
    @GetMapping
    public ResponseEntity<ResponseEntity<ApiResponse<List<UserResponse>>>> getAllUsers() {
        logger.info("Fetching all users...");

        List<UserResponse> users = userService.getAllUsers();

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "Users retrieved successfully",
                        users
                )
        );
    }

    // ---------------------------------------------------------
    // GET USER BY ID
    // ---------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<ResponseEntity<ApiResponse<UserResponse>>> getUserById(@PathVariable Long id) {
        logger.info("Fetching user with ID: {}", id);

        UserResponse user = userService.getUserById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "User retrieved successfully!",
                        user
                )
        );
    }

    // ---------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------
    @PostMapping
    public ResponseEntity<ResponseEntity<ApiResponse<UserResponse>>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        logger.info("Creating user with username: {}", request.username());

        UserResponse newUser = userService.createUser(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        HttpStatus.CREATED,
                        "User created successfully!",
                        newUser
                ));
    }

    // ---------------------------------------------------------
    // FULL UPDATE
    // ---------------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<ResponseEntity<ApiResponse<UserResponse>>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        logger.info("Updating user with ID: {}", id);

        UserResponse updated = userService.updateUser(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "User updated successfully!",
                        updated
                )
        );
    }

    // ---------------------------------------------------------
    // PARTIAL UPDATE
    // ---------------------------------------------------------
    @PatchMapping("/{id}")
    public ResponseEntity<ResponseEntity<ApiResponse<UserResponse>>> partialUpdateUser(
            @PathVariable Long id,
            @RequestBody PartialUpdateUserRequest request) {

        logger.info("Partially updating user with ID: {}", id);

        UserResponse updated = userService.partialUpdateUser(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "User partially updated successfully!",
                        updated
                )
        );
    }

    // ---------------------------------------------------------
    // DELETE USER
    // ---------------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseEntity<ApiResponse<Object>>> deleteUser(@PathVariable Long id) {
        logger.warn("Deleting user with ID: {}", id);

        userService.deleteUser(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "User deleted successfully!",
                        null
                )
        );
    }

    // ---------------------------------------------------------
    // SEARCH USER BY USERNAME

    @GetMapping("/search")
    public ResponseEntity<ResponseEntity<ApiResponse<List<UserResponse>>>> findUserByUsername(
            @RequestParam String username) {

        logger.info("Searching for users with username containing: {}", username);

        List<UserResponse> users = userService.findByUsernameContainingIgnoreCase(username);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK,
                        "Search completed successfully!",
                        users
                )
        );
    }
}