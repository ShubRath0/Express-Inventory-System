
package com.express.inventory.repository;

import com.express.inventory.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void saveUser_shouldPersist() {
        User user = new User("john", "pass");
        User saved = userRepository.save(user);

        assertNotNull(saved.getId());
        assertEquals("john", saved.getUsername());
    }

    @Test
    void findById_shouldReturnUser() {
        User user = new User("john", "pass");
        User saved = userRepository.save(user);

        Optional<User> found = userRepository.findById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals("john", found.get().getUsername());
    }

    @Test
    void findAll_shouldReturnList() {
        userRepository.save(new User("a", "1"));
        userRepository.save(new User("b", "2"));

        List<User> users = userRepository.findAll();

        assertEquals(2, users.size());
    }

    @Test
    void deleteById_shouldRemoveUser() {
        User user = userRepository.save(new User("john", "pass"));

        userRepository.deleteById(user.getId());

        assertFalse(userRepository.findById(user.getId()).isPresent());
    }
}
