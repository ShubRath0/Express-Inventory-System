package com.express.inventory.service;

import com.express.inventory.dto.users.requests.CreateUserRequest;
import com.express.inventory.dto.users.requests.UpdateUserRequest;
import com.express.inventory.dto.users.requests.PartialUpdateUserRequest;
import com.express.inventory.dto.users.responses.UserResponse;
import com.express.inventory.models.UserEntity;
import com.express.inventory.repositories.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.dao.EmptyResultDataAccessException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ GET ALL
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    // ✅ GET BY ID
    public UserResponse getUserById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserResponse.from(user);
    }

    // ✅ CREATE
    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        UserEntity user = UserEntity.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .role(request.role())
                .build();

        return UserResponse.from(userRepository.save(user));
    }

    // ✅ CSV IMPORT
    @Transactional
    public List<UserResponse> createUsersFromCsv(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            List<UserEntity> users = new CsvToBeanBuilder<UserEntity>(reader)
                    .withType(UserEntity.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();

            return userRepository.saveAll(users)
                    .stream()
                    .map(UserResponse::from)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }

    // ✅ UPDATE
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPassword(request.password());
        user.setRole(request.role());

        return UserResponse.from(userRepository.save(user));
    }

    // ✅ PARTIAL UPDATE
    public UserResponse partialUpdateUser(Long id, PartialUpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.firstName() != null) user.setFirstName(request.firstName());
        if (request.lastName() != null) user.setLastName(request.lastName());
        if (request.email() != null) user.setEmail(request.email());
        if (request.password() != null) user.setPassword(request.password());
        if (request.role() != null) user.setRole(request.role());

        return UserResponse.from(userRepository.save(user));
    }

    // ✅ DELETE
    @Transactional
    public void deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new RuntimeException("User not found");
        }
    }

    // ✅ SEARCH (UPDATED)
    public List<UserResponse> findByEmailContainingIgnoreCase(String email) {
        return userRepository.findByEmailContainingIgnoreCase(email)
                .stream()
                .map(UserResponse::from)
                .toList();
    }
}