package com.express.inventory.api.users;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.users.dto.request.CreateUserRequest;
import com.express.inventory.api.users.dto.request.UpdateUserRequest;
import com.express.inventory.api.users.dto.request.UserSearchRequest;
import com.express.inventory.api.users.dto.response.UserDTO;
import com.express.inventory.common.dto.ApiResponse;

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
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        logger.info("Fetching all users...");

        List<UserDTO> users = userService.getAllUsers();
        return ApiResponse.success(HttpStatus.OK, "Users retrieved successfully", users);
    }

    // ---------------------------------------------------------
    // GET USER BY ID
    // ---------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        logger.info("Fetching user with ID: {}", id);

        UserDTO user = userService.getUser(id);
        return ApiResponse.success(HttpStatus.OK, "User retrieved successfully!", user);
    }

    // ---------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------
    // @PreAuthorize("hasRole('ADMIN')")
    // We will PreAuthorize once we get JWT's established
    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        logger.info("Creating user with name: {}", request.firstName());

        UserDTO newUser = userService.createUser(request);
        return ApiResponse.success(HttpStatus.CREATED, "User created successfully!", newUser);
    }

    // ---------------------------------------------------------
    // FULL UPDATE
    // ---------------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        logger.info("Updating user with ID: {}", id);

        UserDTO updated = userService.updateUser(id, request);
        return ApiResponse.success(HttpStatus.OK, "User updated successfully!", updated);
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
    public ResponseEntity<ApiResponse<List<UserDTO>>> searchUsers(
            @ModelAttribute UserSearchRequest request) {
        if (request.email() != null) {
            return ApiResponse.success(HttpStatus.OK, "Search completed", userService.findByEmail(request.email()));
        }
        if (request.name() != null) {
            return ApiResponse.success(HttpStatus.OK, "Search completed", userService.findByName(request.name()));
        }
        return ApiResponse.success(HttpStatus.OK, "Search completed", userService.getAllUsers());
    }
}
