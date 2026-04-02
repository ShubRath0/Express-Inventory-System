package com.express.inventory.repositories;

import com.express.inventory.models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Optional custom queries can go here
    Optional<User> findByUsername(String username);
}