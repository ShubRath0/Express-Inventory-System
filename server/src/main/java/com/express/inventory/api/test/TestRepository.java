package com.express.inventory.api.test;

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
public class TestRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<TestEntity> rowMapper = (rs, rownum) -> new TestEntity(rs.getInt("id"),
            rs.getString("name"));

    public TestRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<TestEntity> findAll() {
        return jdbcTemplate.query(TestSQL.GET_ALL, rowMapper);
    }

    public TestEntity createTestEntity(String name) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement ps = conn.prepareStatement(TestSQL.CREATE_ENTITY, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);
            return ps;
        }, keyHolder);

        int id = keyHolder.getKey().intValue();
        return new TestEntity(id, name);
    }
}
