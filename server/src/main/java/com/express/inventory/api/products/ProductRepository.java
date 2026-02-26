package com.express.inventory.api.products;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.express.inventory.api.enums.Category;

@Repository
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<Product> PRODUCT_ROW_MAPPER = (rs, rowNum) -> {
        Product product = new Product();
        product.setId(rs.getInt("id"));
        product.setName(rs.getString("name"));
        product.setPrice(rs.getDouble("price"));
        product.setStock(rs.getDouble("stock"));
        product.setCategory(Category.valueOf(rs.getString("category")));
        product.setCreated_at(rs.getTimestamp("created_at"));
        return product;
    };

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> getProducts() {
        return jdbcTemplate.query(ProductsSQL.GET_ALL, PRODUCT_ROW_MAPPER);
    }

    public Product getProductById(Integer id) {
        return jdbcTemplate.queryForObject(ProductsSQL.GET_BY_ID, PRODUCT_ROW_MAPPER, id);
    }

    public int createProduct(Product product) {
        return jdbcTemplate.update(ProductsSQL.CREATE_PRODUCT,
                product.getName(),
                product.getPrice(),
                product.getStock(),
                product.getCategory().name());
    }

    public int updateProduct(Integer id, Product product) {
        StringBuilder sql = new StringBuilder(ProductsSQL.UPDATE_PRODUCT);
        List<Object> params = new ArrayList<>();

        if (product.getName() != null) {
            sql.append("name = ?, ");
            params.add(product.getName());
        }

        if (product.getPrice() != null) {
            sql.append("price = ?, ");
            params.add(product.getPrice());
        }

        if (product.getStock() != null) {
            sql.append("stock = ?, ");
            params.add(product.getStock());
        }

        if (product.getCategory() != null) {
            sql.append("category = ?, ");
            params.add(product.getCategory().name());
        }

        if (params.isEmpty()) {
            return 0;
        }

        sql.setLength(sql.length() - 2);

        sql.append(" WHERE id = ?");
        params.add(id);

        return jdbcTemplate.update(sql.toString(), params.toArray());
    }

    public int deleteProduct(Integer id) {
        return jdbcTemplate.update(ProductsSQL.DELETE_PRODUCT, id);
    }
}
