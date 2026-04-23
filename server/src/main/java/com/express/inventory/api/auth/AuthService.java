package com.express.inventory.api.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.express.inventory.api.audit.enums.Action;
import com.express.inventory.api.auth.dto.request.LoginRequest;
import com.express.inventory.api.users.User;
import com.express.inventory.api.users.UserMapper;
import com.express.inventory.api.users.UserRepository;
import com.express.inventory.api.users.dto.response.UserDTO;
import com.express.inventory.common.aspects.audit.Audit;
import com.express.inventory.common.dto.RegisterUserDto;
import com.express.inventory.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public AuthService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder,
        UserMapper userMapper
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.userMapper = userMapper;
    }

    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setEmail(input.getEmail());
        user.setPassword(input.getPassword());
        return userRepository.save(user);
    }

    @Transactional
    @Audit(action = Action.LOGIN, entity = User.class)
    public UserDTO login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException(User.class, request.email()));

        return userMapper.toDTO(user);
    }
}
