package com.express.inventory.api.users;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.express.inventory.api.audit.enums.Action;
import com.express.inventory.api.users.dto.request.CreateUserRequest;
import com.express.inventory.api.users.dto.request.UpdateUserRequest;
import com.express.inventory.api.users.dto.response.UserDTO;
import com.express.inventory.common.aspects.audit.Audit;
import com.express.inventory.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // CREATE
    @Transactional
    @Audit(action = Action.CREATE, entity = User.class)
    public UserDTO createUser(CreateUserRequest request) {
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        return userMapper.toDTO(userRepository.save(user));
    }

    // GET ALL
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .toList();
    }

    // GET BY ID
    @Transactional(readOnly = true)
    public UserDTO getUser(Long id) {
        User user = getUserById(id);
        return userMapper.toDTO(user);
    }

    // FULL UPDATE
    @Transactional
    @Audit(action = Action.UPDATE, entity = User.class)
    public UserDTO updateUser(Long id, UpdateUserRequest request) {
        User user = getUserById(id);
        userMapper.updateUserFromRequest(request, user);
        User updated = userRepository.save(user);
        return userMapper.toDTO(updated);
    }

    // DELETE
    @Transactional
    @Audit(action = Action.DELETE, entity = User.class)
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    // SEARCH BY EMAIL
    @Transactional(readOnly = true)
    public List<UserDTO> findByEmail(String email) {
        return userRepository.findByEmailContainingIgnoreCase(email)
                .stream()
                .map(userMapper::toDTO)
                .toList();
    }

    // SEARCH BY NAME
    @Transactional(readOnly = true)
    public List<UserDTO> findByName(String name) {
        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name)
                .stream()
                .map(userMapper::toDTO)
                .toList();
    }

    // HELPERS

    private User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(User.class, id));
    }
}