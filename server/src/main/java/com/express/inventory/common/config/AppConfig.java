package com.express.inventory.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuration class for password encryption.
 * Provides a bean to be used across the application for hashing and verifying
 * passwords.
 */
@Configuration
@EnableJpaAuditing
public class AppConfig {

    /**
     * Defines the password encoding algorithm for the application.
     * Uses BCrypt, which is a strong, one-way adaptive hashing function.
     * 
     * @return a BCryptPasswordEncoder instance as a Singleton Bean
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
