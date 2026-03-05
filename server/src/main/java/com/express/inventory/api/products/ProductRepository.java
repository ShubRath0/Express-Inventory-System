package com.express.inventory.api.products;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {
    // Optional<ProductEntity> findBySku(String sku);
    // boolean existsBySku(String sku);
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<ProductEntity> rowMapper = (rs, rownum) -> 
        new ProductEntity(rs.getInt("id"), rs.getString("name"));

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ProductEntity> findAll() {
        return jdbcTemplate.query(ProductSQL.GET_ALL, rowMapper);
    }

    public List<ProductEntity> findById(int id) {
        return jdbcTemplate.query(ProductSQL.GET_BY_ID, rowMapper);
    }

    public ProductEntity createProductEntity(String name) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement ps = conn.prepareStatement(ProductSQL.CREATE_ENTITY, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);
            return ps;
        }, keyHolder);

        int id = keyHolder.getKey().intValue();
        return new ProductEntity(id, name);
    }
     
    // List<ProductEntity> findByProductTypeIgnoreCase(String productType) {}
}
