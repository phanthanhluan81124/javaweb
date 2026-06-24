package com.example.demo.repository;

import com.example.demo.model.Product;
import com.example.demo.model.Product_Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductCategoryRepository extends JpaRepository<Product_Category, Integer> {
    boolean existsById_IdProductAndId_IdCategory(Integer idProduct, Integer idCategory);

    @Query("SELECT pc FROM Product_Category pc JOIN FETCH pc.product JOIN FETCH pc.category")
    List<Product_Category> findAllWithRelationships();

    @Modifying
    @Transactional
    @Query("DELETE FROM Product_Category pc WHERE pc.id.idProduct = :idProduct AND pc.id.idCategory = :idCategory")
    void deleteByProductIdAndCategoryId(@Param("idProduct") Integer idProduct, @Param("idCategory") Integer idCategory);

    @Modifying
    @Transactional
    @Query("DELETE FROM Product_Category pc WHERE pc.product.id = :productId")
    void deleteByProductId(@Param("productId") int productId);
}
