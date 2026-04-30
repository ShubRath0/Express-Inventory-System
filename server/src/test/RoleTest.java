package test;

import com.express.inventory.models.Role;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RoleTest {

    @Test
    void enum_shouldContainAllExpectedValues() {
        Role[] roles = Role.values();

        assertEquals(5, roles.length);
        assertArrayEquals(
                new Role[]{
                        Role.CLERK,
                        Role.ADMIN,
                        Role.MANAGER,
                        Role.STOCK_COUNTER,
                        Role.VIEWER
                },
                roles
        );
    }

    @Test
    void valueOf_shouldReturnCorrectEnum() {
        assertEquals(Role.CLERK, Role.valueOf("CLERK"));
        assertEquals(Role.ADMIN, Role.valueOf("ADMIN"));
        assertEquals(Role.MANAGER, Role.valueOf("MANAGER"));
        assertEquals(Role.STOCK_COUNTER, Role.valueOf("STOCK_COUNTER"));
        assertEquals(Role.VIEWER, Role.valueOf("VIEWER"));
    }

    @Test
    void valueOf_shouldThrowExceptionForInvalidValue() {
        assertThrows(IllegalArgumentException.class, () -> Role.valueOf("INVALID"));
    }

    @Test
    void enumNames_shouldMatchExpectedStrings() {
        assertEquals("CLERK", Role.CLERK.name());
        assertEquals("ADMIN", Role.ADMIN.name());
        assertEquals("MANAGER", Role.MANAGER.name());
        assertEquals("STOCK_COUNTER", Role.STOCK_COUNTER.name());
        assertEquals("VIEWER", Role.VIEWER.name());
    }
}
