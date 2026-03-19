package com.express.inventory.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    // Temporary in-memory list (until DB wiring is added)
    private final List<String> users = new ArrayList<>();

    public List<String> getAllUsers() {
        return users;
    }

    public String getUserById(Long id) {
        return "User with ID: " + id;
    }

    public String createUser(String username) {
        users.add(username);
        return "User created: " + username;
    }

    public String updateUser(Long id, String username) {
        return "User " + id + " updated to " + username;
    }

    public String deleteUser(Long id) {
        return "User deleted with ID: " + id;
    }
}