package com.express.inventory.api.users;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.users.dto.request.CreateUserRequest;
import com.express.inventory.api.users.dto.request.PartialUpdateUserRequest;
import com.express.inventory.api.users.dto.request.UpdateUserRequest;
import com.express.inventory.api.users.dto.response.UserResponse;
import com.express.inventory.common.dto.ApiResponse;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final static Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    // ---------------------------------------------------------
    // GET ALL USERS
    // ---------------------------------------------------------
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        logger.info("Fetching all users...");

        List<UserResponse> users = userService.getAllUsers();
        return ApiResponse.success(HttpStatus.OK, "Users retrieved successfully", users);
    }

    // ---------------------------------------------------------
    // GET USER BY ID
    // ---------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        logger.info("Fetching user with ID: {}", id);

        UserResponse user = userService.getUser(id);
        return ApiResponse.success(HttpStatus.OK, "User retrieved successfully!", user);
    }

    // ---------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        logger.info("Creating user with username: {}", request.username());

        UserResponse newUser = userService.createUser(request);
        return ApiResponse.success(HttpStatus.CREATED, "User created successfully!", newUser);
    }

    // ---------------------------------------------------------
    // FULL UPDATE
    // ---------------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        logger.info("Updating user with ID: {}", id);

        UserResponse updated = userService.updateUser(id, request);
        return ApiResponse.success(HttpStatus.OK, "User updated successfully!", updated);
    }

    // ---------------------------------------------------------
    // PARTIAL UPDATE
    // ---------------------------------------------------------
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> partialUpdateUser(
            @PathVariable Long id,
            @RequestBody PartialUpdateUserRequest request) {

        logger.info("Partially updating user with ID: {}", id);

        UserResponse updated = userService.partialUpdateUser(id, request);
        return ApiResponse.success(HttpStatus.OK, "User partially updated successfully!", updated);
    }

    // ---------------------------------------------------------
    // DELETE USER
    // ---------------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable Long id) {
        logger.warn("Deleting user with ID: {}", id);

        userService.deleteUser(id);
        return ApiResponse.success(HttpStatus.OK, "User deleted successfully!", null);
    }

    // ---------------------------------------------------------
    // SEARCH USER BY USERNAME
    // ---------------------------------------------------------

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<UserResponse>>> findUserByUsername(
            @RequestParam String username) {
        logger.info("Searching for users with username containing: {}", username);

        List<UserResponse> users = userService.findByUsernameContainingIgnoreCase(username);
        return ApiResponse.success(HttpStatus.OK, "Search completed successfully!", users);
    }
}
