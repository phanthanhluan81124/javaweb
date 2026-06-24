package com.example.demo.service.impl;

import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.model.ProductCategoryId;
import com.example.demo.model.Product_Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductCategoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @PersistenceContext
    private EntityManager entityManager1;
    @Override
    @Transactional
    public Product saveProductWithCategories(Product product, List<Integer> categoryIds) {
        if (product.getId() != null && product.getId() > 0) {

            productCategoryRepository.deleteByProductId(product.getId());

            if (product.getProductCategories() != null) {
                product.getProductCategories().clear();
            }

            entityManager1.flush();
            entityManager1.clear();
        }

        Product productToSave = product;
        if (product.getId() != null && product.getId() > 0) {
            productToSave = productRepository.findById(product.getId()).orElse(product);
            productToSave.setMa(product.getMa());
            productToSave.setTen(product.getTen());
            productToSave.setGia(product.getGia());
            productToSave.setSlton(product.getSlton());
            productToSave.setMota(product.getMota());
            productToSave.setImage(product.getImage());
            productToSave.setStatus(product.getStatus());
        }

        Product savedProduct = productRepository.save(productToSave);

        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Integer catId : categoryIds) {
                Category category = categoryRepository.findById(catId).orElse(null);

                if (category != null) {
                    Product_Category pc = new Product_Category();

                    ProductCategoryId pcId = new ProductCategoryId(savedProduct.getId(), category.getId());
                    pc.setId(pcId);

                    pc.setProduct(savedProduct);
                    pc.setCategory(category);

                    productCategoryRepository.save(pc);
                }
            }
        }
        return savedProduct;
    }

    @Override
    public List<Product> getAllProduct(){
        return productRepository.findAllWithCategories();
    }

    @Override
    public Boolean existProduct(String name){
        return productRepository.existsByTen(name);
    }

    @Override
    public Boolean deleteProduct(int id){
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setDeleted_at(java.time.OffsetDateTime.now());
            product.setStatus(0);
            productRepository.save(product);
            return true;
        }
        return false;
    }
    @Override
    public Product getProduct(int id) {
        return productRepository.findByIdWithCategories(id).orElse(null);
    }

}
