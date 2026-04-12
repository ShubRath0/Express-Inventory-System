package com.express.inventory.service;

import com.express.inventory.dto.users.requests.CreateUserRequest;
import com.express.inventory.dto.users.requests.UpdateUserRequest;
import com.express.inventory.dto.users.requests.PartialUpdateUserRequest;
import com.express.inventory.dto.users.responses.UserResponse;
import com.express.inventory.models.UserEntity;
import com.express.inventory.exceptions.UserNotFoundException;
import com.express.inventory.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    // CREATE
    public UserResponse createUser(CreateUserRequest request) {
        UserEntity user = UserEntity.builder()
                .username(request.username())
                .password(request.password())
                .build();

        UserEntity saved = userRepository.save(user);
        return UserResponse.from(saved);
    }

    // GET ALL
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    // GET BY ID
    public UserResponse getUserById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        return UserResponse.from(user);
    }


    // FULL UPDATE
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        user.setUsername(request.username());
        user.setPassword(request.password());

        UserEntity updated = userRepository.save(user);
        return UserResponse.from(updated);
    }


    // PARTIAL UPDATE
    public UserResponse partialUpdateUser(Long id, PartialUpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        if (request.username() != null) {
            user.setUsername(request.username());
        }

        if (request.password() != null) {
            user.setPassword(request.password());
        }

        UserEntity updated = userRepository.save(user);
        return UserResponse.from(updated);
    }

    // DELETE
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }

        userRepository.deleteById(id);
    }


    // SEARCH BY USERNAME
    public List<UserResponse> findByUsernameContainingIgnoreCase(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username)
                .stream()
                .map(UserResponse::from)
                .toList();
    }
}