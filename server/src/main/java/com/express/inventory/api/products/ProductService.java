package com.express.inventory.api.products;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getProducts() {
        return repository.getProducts();
    }

    public Product getProductById(Integer id) {
        try {
            return repository.getProductById(id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public boolean createProduct(Product product) {
        try {
            int rows = repository.createProduct(product);
            if (rows == 1) {
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean updateProduct(Integer id, Product product) {
        try {
            int rows = repository.updateProduct(id, product);
            if (rows == 1) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteProduct(Integer id) {
        try {
            int rows = repository.deleteProduct(id);
            if (rows == 1) {
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}