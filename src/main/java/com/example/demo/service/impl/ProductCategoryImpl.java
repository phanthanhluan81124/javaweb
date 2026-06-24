package com.example.demo.service.impl;

import com.example.demo.model.Product;
import com.example.demo.model.ProductCategoryId;
import com.example.demo.model.Product_Category;
import com.example.demo.repository.ProductCategoryRepository;
import com.example.demo.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductCategoryImpl implements ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Override
    public Product_Category saveProductCategory(Product_Category productCategory) {
        if (productCategory.getProduct() != null && productCategory.getCategory() != null) {
            ProductCategoryId id = new ProductCategoryId(
                    productCategory.getProduct().getId(),
                    productCategory.getCategory().getId()
            );
            productCategory.setId(id);
        }
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public List<Product_Category> getAllProductCategory() {
        return productCategoryRepository.findAllWithRelationships();
    }

    @Override
    public Boolean existProductCategory(Integer idProduct, Integer idCategory) {
        return productCategoryRepository.existsById_IdProductAndId_IdCategory(idProduct, idCategory);
    }

    @Override
    public Boolean deleteProductCategory(Integer idProduct, Integer idCategory) {
        if (productCategoryRepository.existsById_IdProductAndId_IdCategory(idProduct, idCategory)) {
            productCategoryRepository.deleteByProductIdAndCategoryId(idProduct, idCategory);
            return true;
        }
        return false;
    }
}
