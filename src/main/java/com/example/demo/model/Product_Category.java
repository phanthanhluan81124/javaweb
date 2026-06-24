package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="product_category")
public class Product_Category {
    @EmbeddedId
    private ProductCategoryId id = new ProductCategoryId();

    @ManyToOne
    @MapsId("idProduct")
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
    @MapsId("idCategory")
    @JoinColumn(name = "id_category")
    private Category category;

    @CreationTimestamp
    @Column(name = "created_at",updatable = false, nullable = false,columnDefinition = "datetimeoffset")
    private OffsetDateTime create_at;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "datetimeoffset")
    private OffsetDateTime updated_at;
    @Column(name = "deleted_at",columnDefinition = "datetimeoffset")
    private OffsetDateTime deleted_at;

}
