package com.express.inventory.api.users;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.express.inventory.api.users.dto.request.CreateUserRequest;
import com.express.inventory.api.users.dto.request.PartialUpdateUserRequest;
import com.express.inventory.api.users.dto.request.UpdateUserRequest;
import com.express.inventory.api.users.dto.response.UserResponse;
import com.express.inventory.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    // CREATE
    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        User user = User.builder()
                .username(request.username())
                .password(request.password())
                .build();

        User saved = userRepository.save(user);
        return UserResponse.from(saved);
    }

    // GET ALL
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    // GET BY ID
    @Transactional(readOnly = true)
    public UserResponse getUser(Long id) {
        User user = getUserById(id);
        return UserResponse.from(user);
    }

    // FULL UPDATE
    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User user = getUserById(id);

        user.setUsername(request.username());
        user.setPassword(request.password());

        User updated = userRepository.save(user);
        return UserResponse.from(updated);
    }

    // PARTIAL UPDATE
    @Transactional
    public UserResponse partialUpdateUser(Long id, PartialUpdateUserRequest request) {
        User user = getUserById(id);

        if (request.username() != null) {
            user.setUsername(request.username());
        }

        if (request.password() != null) {
            user.setPassword(request.password());
        }

        User updated = userRepository.save(user);
        return UserResponse.from(updated);
    }

    // DELETE
    @Transactional
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    // SEARCH BY USERNAME
    @Transactional(readOnly = true)
    public List<UserResponse> findByUsernameContainingIgnoreCase(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username)
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    // HELPERS

    public User getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(User.class, id));

        return user;
    }
}