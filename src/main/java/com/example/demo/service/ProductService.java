package com.example.demo.service;

import com.example.demo.model.Product;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ProductService {

    @Transactional
    Product saveProductWithCategories(Product product, List<Integer> categoryIds);

    public List<Product> getAllProduct();

    public Boolean existProduct(String name);

    public Boolean deleteProduct(int id);

    public Product getProduct(int id);
}
