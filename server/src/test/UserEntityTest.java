package test;

import com.express.inventory.models.Role;
import com.express.inventory.models.UserEntity;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserEntityTest {

    @Test
    void builder_shouldCreateUserEntityWithAllFields() {
        UserEntity user = UserEntity.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .password("secret123")
                .role(Role.ADMIN)
                .build();

        assertEquals(1L, user.getId());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("secret123", user.getPassword());
        assertEquals(Role.ADMIN, user.getRole());
    }

    @Test
    void getUsername_shouldReturnEmail() {
        UserEntity user = UserEntity.builder()
                .email("user@test.com")
                .build();

        assertEquals("user@test.com", user.getUsername());
    }

    @Test
    void getPassword_shouldReturnPassword() {
        UserEntity user = UserEntity.builder()
                .password("mypassword")
                .build();

        assertEquals("mypassword", user.getPassword());
    }

    @Test
    void accountStatusMethods_shouldAlwaysReturnTrue() {
        UserEntity user = new UserEntity();

        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }

    @Test
    void setters_shouldUpdateFieldsCorrectly() {
        UserEntity user = new UserEntity();

        user.setFirstName("Alice");
        user.setLastName("Smith");
        user.setEmail("alice@example.com");
        user.setPassword("pass123");
        user.setRole(Role.USER);

        assertEquals("Alice", user.getFirstName());
        assertEquals("Smith", user.getLastName());
        assertEquals("alice@example.com", user.getEmail());
        assertEquals("pass123", user.getPassword());
        assertEquals(Role.USER, user.getRole());
    }
}
