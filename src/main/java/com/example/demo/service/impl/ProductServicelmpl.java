package com.example.demo.service.impl;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class ProductServicelmpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product){return productRepository.save(product);}

    @Override
    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    @Override
    public Boolean existProduct(String name){
        return productRepository.existByTen(name);
    }

    @Override
    public Boolean deleteProduct(int id){
        Product product = productRepository.findById(id).orElse(null);
        if(!ObjectUtils.isEmpty(product)){
            productRepository.delete(product);
            return true;
        }
        return false;
    }
    @Override
    public Product getProduct(int id){
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

}
