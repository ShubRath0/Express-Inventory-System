package com.express.inventory.repositories;

import com.express.inventory.models.UserEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // Optional custom queries can go here
    Optional<UserEntity> findByUsernameContainingIgnoreCase(String username);
}