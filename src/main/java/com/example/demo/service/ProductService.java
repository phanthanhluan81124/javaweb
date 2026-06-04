package com.example.demo.service;

import com.example.demo.model.Product;

import java.util.List;

public interface ProductService {

    public Product saveProduct(Product product);

    public List<Product> getAllProduct();

    public Boolean existProduct(String name);

    public Boolean deleteProduct(int id);

    public Product getProduct(int id);
}
