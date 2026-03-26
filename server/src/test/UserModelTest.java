class UserTest {

    @Test
    void userConstructor_shouldSetFields() {
        User user = new User("john", "pass");

        assertEquals("john", user.getUsername());
        assertEquals("pass", user.getPassword());
    }
}
