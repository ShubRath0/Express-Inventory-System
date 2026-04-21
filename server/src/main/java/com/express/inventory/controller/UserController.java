package com.express.inventory.controller;

import com.express.inventory.dto.common.ApiResponse;
import com.express.inventory.dto.users.responses.UserResponse;
import com.express.inventory.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET ALL USERS (Swagger will show this again)
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        return ApiResponse.success(
                HttpStatus.OK,
                "Users retrieved successfully",
                userService.getAllUsers()
        );
    }

    // CSV upload
    @PostMapping(
            value = "/csv",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<List<UserResponse>>> createUserWithCsv(
            @RequestParam("file") MultipartFile file
    ) {
        return ApiResponse.success(
                HttpStatus.CREATED,
                "Users created successfully!",
                userService.createUsersFromCsv(file)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ApiResponse.success(
                HttpStatus.OK,
                "User deleted successfully",
                null
        );
    }
}