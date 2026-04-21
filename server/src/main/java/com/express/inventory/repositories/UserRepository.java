package com.express.inventory.repositories;

import com.express.inventory.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {


    // 🔍 Search by email
    List<UserEntity> findByEmailContainingIgnoreCase(String email);

    // 🔍 Exact email lookup (useful for login / uniqueness)
    Optional<UserEntity> findByEmail(String email);

    // 🔍 Search by first name
    List<UserEntity> findByFirstNameContainingIgnoreCase(String firstName);

    // 🔍 Search by last name
    List<UserEntity> findByLastNameContainingIgnoreCase(String lastName);

    // 🔍 Combined search
    List<UserEntity> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName, String lastName
    );
}