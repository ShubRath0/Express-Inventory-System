package test;

import com.express.inventory.exceptions.UserNotFoundException;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserNotFoundExceptionTest {

    @Test
    void constructor_shouldStoreMessage() {
        UserNotFoundException ex = new UserNotFoundException("User not found");
        assertEquals("User not found", ex.getMessage());
    }

    @Test
    void exception_shouldBeRuntimeException() {
        UserNotFoundException ex = new UserNotFoundException("msg");
        assertTrue(ex instanceof RuntimeException);
    }

    @Test
    void throwingException_shouldThrowCorrectType() {
        assertThrows(UserNotFoundException.class, () -> {
            throw new UserNotFoundException("missing");
        });
    }
}

