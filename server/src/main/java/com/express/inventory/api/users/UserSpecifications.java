package com.express.inventory.api.users;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.express.inventory.api.users.dto.request.UserSearchRequest;

import jakarta.persistence.criteria.Predicate;

public class UserSpecifications {

    public static Specification<User> filter(UserSearchRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Email filter
            if (request.email() != null && !request.email().isBlank()) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("email")),
                                "%" + request.email().toLowerCase() + "%"));
            }

            // Name filter (matches firstName OR lastName)
            if (request.name() != null && !request.name().isBlank()) {

                String[] names = request.name().trim().toLowerCase().split("\\s+");

                String firstName = names[0];
                String lastName = names.length > 1 ? names[1] : null;

                Predicate firstNameMatch = cb.like(
                        cb.lower(root.get("firstName")),
                        "%" + firstName + "%");

                Predicate lastNameMatch = lastName != null
                        ? cb.like(cb.lower(root.get("lastName")), "%" + lastName + "%")
                        : cb.like(cb.lower(root.get("lastName")), "%" + firstName + "%");

                if (lastName != null) {
                    predicates.add(cb.and(firstNameMatch, lastNameMatch));
                } else {
                    predicates.add(cb.or(firstNameMatch, lastNameMatch));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}