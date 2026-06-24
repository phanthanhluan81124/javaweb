package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    public  Boolean existsByTen(String ten);
    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.productCategories pc " +
            "LEFT JOIN FETCH pc.category " +
            "WHERE p.deleted_at IS NULL")
    List<Product> findAllWithCategories();

    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.productCategories pc " +
            "LEFT JOIN FETCH pc.category " +
            "WHERE p.id = :id AND p.deleted_at IS NULL")
    Optional<Product> findByIdWithCategories(@Param("id") int id);
}
