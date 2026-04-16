package com.express.inventory.controller;

import com.express.inventory.dto.common.ApiResponse;
import com.express.inventory.dto.users.requests.CreateUserRequest;
import com.express.inventory.dto.users.requests.UpdateUserRequest;
import com.express.inventory.dto.users.requests.PartialUpdateUserRequest;
import com.express.inventory.dto.users.responses.UserResponse;
import com.express.inventory.models.ProductEntity;
import com.express.inventory.service.UserService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

@GetMapping
public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
    List<UserResponse> users = userService.getAllUsers();
    return ApiResponse.success(HttpStatus.OK, "Users retrieved successfully", users);
}

@PostMapping("/csv")
public ResponseEntity<ApiResponse<List<UserResponse>>> createUserWithCsv(
        @RequestParam MultipartFile file) {
List<UserResponse> users = userService.createUsersFromCsv(file);
return ApiResponse.success(HttpStatus.CREATED, "Users created successfully!", users);
}

 @GetMapping("/{id}")
public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
    return ApiResponse.success(HttpStatus.OK, "User retrieved successfully", userService.getUserById(id));
}

@PostMapping
public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody CreateUserRequest request) {
    return ApiResponse.success(HttpStatus.CREATED, "User created successfully", userService.createUser(request));
}

@PutMapping("/{id}")
public ResponseEntity<ApiResponse<UserResponse>> updateUser(
        @PathVariable Long id,
        @Valid @RequestBody UpdateUserRequest request) {

    return ApiResponse.success(HttpStatus.OK, "User updated successfully", userService.updateUser(id, request));
}

@PatchMapping("/{id}")
public ResponseEntity<ApiResponse<UserResponse>> partialUpdateUser(
        @PathVariable Long id,
        @RequestBody PartialUpdateUserRequest request) {

    return ApiResponse.success(HttpStatus.OK, "User partially updated successfully", userService.partialUpdateUser(id, request));
}

@DeleteMapping("/{id}")
public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ApiResponse.success(HttpStatus.OK, "User deleted successfully", null);
}

@GetMapping("/search")
public ResponseEntity<ApiResponse<List<UserResponse>>> searchUsers(@RequestParam String username) {
    return ApiResponse.success(HttpStatus.OK, "Search completed successfully",
            userService.findByUsernameContainingIgnoreCase(username));
}
}