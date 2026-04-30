package test;

import com.express.inventory.dto.common.ApiResponse;
import com.express.inventory.dto.common.FieldError;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletRequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ApiResponseTest {

    @BeforeEach
    void setupRequestContext() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI("/api/test");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
    }

    @AfterEach
    void clearRequestContext() {
        RequestContextHolder.resetRequestAttributes();
    }

    @Test
    void success_shouldCreateValidApiResponse() {
        ResponseEntity<ApiResponse<String>> response =
                ApiResponse.success(HttpStatus.OK, "Operation successful", "DATA");

        assertEquals(HttpStatus.OK, response.getStatusCode());

        ApiResponse<String> body = response.getBody();
        assertNotNull(body);

        assertEquals(200, body.status());
        assertTrue(body.success());
        assertNull(body.error());
        assertEquals("Operation successful", body.message());
        assertEquals("/api/test", body.path());
        assertEquals("DATA", body.data());
        assertNull(body.fieldErrors());
        assertNotNull(body.timestamp());
    }

    @Test
    void error_withFieldErrors_shouldCreateErrorResponse() {
        List<FieldError> errors = List.of(
                new FieldError("email", "Email is invalid")
        );

        ResponseEntity<ApiResponse<Object>> response =
                ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation failed", errors);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        ApiResponse<Object> body = response.getBody();
        assertNotNull(body);

        assertEquals(400, body.status());
        assertFalse(body.success());
        assertEquals("Bad Request", body.error());
        assertEquals("Validation failed", body.message());
        assertEquals("/api/test", body.path());
        assertNull(body.data());
        assertEquals(errors, body.fieldErrors());
        assertNotNull(body.timestamp());
    }

    @Test
    void error_withoutFieldErrors_shouldCreateBasicErrorResponse() {
        ResponseEntity<ApiResponse<Object>> response =
                ApiResponse.error(HttpStatus.NOT_FOUND, "User not found");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        ApiResponse<Object> body = response.getBody();
        assertNotNull(body);

        assertEquals(404, body.status());
        assertFalse(body.success());
        assertEquals("Not Found", body.error());
        assertEquals("User not found", body.message());
        assertEquals("/api/test", body.path());
        assertNull(body.data());
        assertNull(body.fieldErrors());
        assertNotNull(body.timestamp());
    }

    
}
