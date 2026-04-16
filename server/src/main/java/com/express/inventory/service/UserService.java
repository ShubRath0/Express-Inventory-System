package com.express.inventory.service;

import com.express.inventory.dto.products.request.CreateProductRequest;
import com.express.inventory.dto.products.request.UpdateProductRequest;
import com.express.inventory.dto.users.requests.CreateUserRequest;
import com.express.inventory.dto.users.requests.UpdateUserRequest;
import com.express.inventory.dto.users.requests.PartialUpdateUserRequest;
import com.express.inventory.dto.users.responses.UserResponse;
import com.express.inventory.models.ProductEntity;
import com.express.inventory.models.UserEntity;
import com.express.inventory.repositories.UserRepository;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import javax.swing.text.Utilities;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

     // Read Product(s)
    @Transactional(readOnly = true)
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserResponse getUserById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.from(user);
    }

     // Create Product
    @Transactional
    public UserEntity createUser(CreateUserRequest request) {
        UserEntity user = UserEntity.builder()
                .username(request.username())
                .password(request.password())
                .build();

        return userRepository.save(user);
    }

     @Transactional
    public List<UserEntity> createUsersFromCsv(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<UserEntity> Users = new CsvToBeanBuilder<UserEntity>(reader)
                    .withType(UserEntity.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            return userRepository.saveAll(Users);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }

    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(request.username());
        user.setPassword(request.password());

        return UserResponse.from(userRepository.save(user));
    }
      // Update Product
    @Transactional
    public UserEntity updateUser(UpdateUserRequest request, Integer id) {
        UserEntity product = getUserById(id);
        Utilities.copyNonNullProperties(request, user);
        return userRepository.save(user);
    }

    public UserResponse partialUpdateUser(Long id, PartialUpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.username() != null) user.setUsername(request.username());
        if (request.password() != null) user.setPassword(request.password());

        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Integer id) {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new UserNotFoundException();
        }
    }

    public List<UserResponse> findByUsernameContainingIgnoreCase(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username)
                .stream()
                .map(UserResponse::from)
                .toList();
    }
}