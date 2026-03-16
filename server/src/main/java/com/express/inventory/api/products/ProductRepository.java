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

import com.express.inventory.api.products.dto.CreateProductRequest;
import com.express.inventory.api.products.dto.UpdateProductRequest;

@Repository
public class ProductRepository {
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<ProductEntity> rowMapper = (rs, rownum) -> {
        ProductEntity product = new ProductEntity();
        product.setId(rs.getInt("id"));
        product.setName(rs.getString("name"));
        product.setProductType(rs.getString("productType"));
        product.setStockThreshold(rs.getDouble("stockThreshold"));
        product.setPrice(rs.getDouble("price"));
        product.setStock(rs.getInt("stock"));
        product.setCreatedAt(rs.getTimestamp("created_at"));
        product.setUpdatedAt(rs.getTimestamp("updated_at"));
        return product;
    };

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ProductEntity> findAll() {
        return jdbcTemplate.query(ProductSQL.GET_ALL, rowMapper);
    }

    public List<ProductEntity> findSearched(String keyword) {
        return jdbcTemplate.query(ProductSQL.PRODUCT_SEARCH_QUERY, rowMapper);
    }

    public ProductEntity findById(int id) {
        return jdbcTemplate.queryForObject(ProductSQL.GET_BY_ID, rowMapper, id);
    }

    public ProductEntity createProductEntity(CreateProductRequest request) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement ps = conn.prepareStatement(ProductSQL.CREATE_ENTITY, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, request.getName());
            ps.setString(2, request.getProductType());
            ps.setInt(3, request.getStock());
            ps.setDouble(4, request.getStockThreshold());
            ps.setDouble(5, request.getPrice());
            return ps;
        }, keyHolder);

        int id = keyHolder.getKey().intValue();
        return findById(id);
    }

    public ProductEntity updateProductEntity(UpdateProductRequest request) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement ps = conn.prepareStatement(ProductSQL.UPDATE_ENTITY, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, request.getName());
            ps.setString(2, request.getProductType());
            ps.setInt(3, request.getStock());
            ps.setDouble(4, request.getStockThreshold());
            ps.setDouble(5, request.getPrice());
            return ps;
        }, keyHolder);

        int id = keyHolder.getKey().intValue();
        return findById(id);
    }

    public boolean deleteProductEntity(int id) {
        return jdbcTemplate.update(ProductSQL.DELETE_ENTITY, id) >= 0;
    }
}
