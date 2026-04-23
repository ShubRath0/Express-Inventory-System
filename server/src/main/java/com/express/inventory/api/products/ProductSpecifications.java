package com.express.inventory.api.products;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.express.inventory.api.products.dto.request.GetFilteredRequest;

import jakarta.persistence.criteria.Predicate;

public class ProductSpecifications {
    public static Specification<Product> filter(GetFilteredRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.search() != null && !request.search().isBlank()) {
                predicates.add(
                        cb.like(cb.lower(root.get("name")),
                                "%" + request.search().toLowerCase() + "%"));
            }

            if (request.category() != null) {
                predicates.add(cb.equal(root.get("category"), request.category()));
            }

            if (request.stockStatus() != null) {
                switch (request.stockStatus()) {
                    case NO_STOCK ->
                        predicates.add(cb.equal(root.get("stock"), 0));
                    case LOW_STOCK ->
                        predicates.add(cb.and(
                                cb.greaterThan(root.get("stock"), 0),
                                cb.lessThanOrEqualTo(root.get("stock"), root.get("lowStockThreshold"))));
                    case ABOVE_THRESHOLD ->
                        predicates.add(cb.greaterThan(root.get("stock"), root.get("lowStockThreshold")));
                }
            }

            if (predicates.isEmpty()) {
                return cb.conjunction();
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
