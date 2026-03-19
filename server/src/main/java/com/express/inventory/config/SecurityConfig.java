package com.express.inventory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

/**
 * Main security configuration for the Auth Service.
 * Configures JWT-based stateless authentication and defines public vs protected
 * endpoints.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * Configures the security filter chain.
     * 
     * @param http The HttpSecurity to configure.
     * @return the built SecurityFilterChain.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disables CSRF as we are using stateless JWT tokens in the future
                .csrf(csrf -> csrf.disable())

                // Define access rules for endpoints
                .authorizeHttpRequests(auth -> auth

                        // Allow public access to authentication API and Documentation
                        .requestMatchers(
                                "/api/v1/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html",
                                "/actuator/health")
                        .permitAll()

                        // All other requests require a valid JWT
                        .anyRequest().authenticated())

                // Set session management to STATELESS; no session cookies will be created or
                // used.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
