
package com.express.inventory.service;

import com.express.inventory.models.User;
import com.express.inventory.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_shouldSaveUser() {
        // Arrange
        User savedUser = new User("john", "pass");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.createUser("john", "pass");

        // Assert
        assertEquals("john", result.getUsername());
        assertEquals("pass", result.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void getAllUsers_shouldReturnList() {
        // Arrange
        List<User> users = Arrays.asList(
                new User("a", "1"),
                new User("b", "2")
        );
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @Test
    void getUserById_shouldReturnUser() {
        // Arrange
        User user = new User("john", "pass");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("john", result.get().getUsername());
    }

    @Test
    void updateUser_shouldUpdateExistingUser() {
        // Arrange
        User existing = new User("old", "oldpass");
        when(userRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenReturn(existing);

        // Act
        User result = userService.updateUser(1L, "new", "newpass");

        // Assert
        assertEquals("new", result.getUsername());
        assertEquals("newpass", result.getPassword());
        verify(userRepository).save(existing);
    }

    @Test
    void updateUser_shouldReturnNullIfNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        User result = userService.updateUser(1L, "x", "y");

        assertNull(result);
    }

    @Test
    void deleteUser_shouldCallRepository() {
        // Act
        userService.deleteUser(1L);

        // Assert
        verify(userRepository).deleteById(1L);
    }
}
