package com.express.inventory.db;

import java.sql.SQLException;
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    DataSource dataSource() throws SQLException, ClassNotFoundException {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName(DbConstants.DRIVER_CLASS);
        ds.setUrl(DbConstants.URL);
        ds.setUsername(DbConstants.USERNAME);
        ds.setPassword(DbConstants.PASSWORD);
        return ds;
    }

    @Bean
    JdbcTemplate jdbcTemplate(DataSource ds) {
        return new JdbcTemplate(ds);
    }
}
