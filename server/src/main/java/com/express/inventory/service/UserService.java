package com.express.inventory.service;

import com.express.inventory.models.User;
import com.express.inventory.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //  Create a new user
    public User createUser(String username, String password) {
        User user = new User(username, password);
        return userRepository.save(user);
    }

    //  Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //  Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    //  Update user (FULL update, but allows null-safe fields)
    public User updateUser(Long id, String username, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        if (username != null) {
            user.setUsername(username);
        }
        if (password != null) {
            user.setPassword(password);
        }

        return userRepository.save(user);
    }

    //  Partial update
    public User partialUpdateUser(Long id, User partialUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        if (partialUser.getUsername() != null) {
            existingUser.setUsername(partialUser.getUsername());
        }

        if (partialUser.getPassword() != null) {
            existingUser.setPassword(partialUser.getPassword());
        }

        return userRepository.save(existingUser);
    }

    // Delete user
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }

        userRepository.deleteById(id);
        return "User deleted successfully with ID: " + id;
    }

    // Find user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}