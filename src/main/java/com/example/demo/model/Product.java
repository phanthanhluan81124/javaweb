package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "ma")
    private String ma;
    @Column(name = "ten")
    private String ten;
    @Column(name = "mota")
    private String mota;
    @Column(name = "gia")
    private float gia;
    @Column(name = "image")
    private String image;
    @Column(name = "status")
    private int status;
    @Column(name = "slton")
    private int slton;
    @CreationTimestamp
    @Column(name = "created_at",updatable = false, nullable = false,columnDefinition = "datetimeoffset")
    private OffsetDateTime create_at;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "datetimeoffset")
    private OffsetDateTime updated_at;
    @Column(name = "deleted_at",columnDefinition = "datetimeoffset")
    private OffsetDateTime deleted_at;
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Product_Category> productCategories;
    public String getCategoryIdsString() {
        if (this.productCategories == null || this.productCategories.isEmpty()) {
            return "";
        }
        return this.productCategories.stream()
                .map(pc -> String.valueOf(pc.getCategory().getId()))
                .collect(java.util.stream.Collectors.joining(","));
    }
}
