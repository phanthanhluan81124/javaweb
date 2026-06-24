package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor  // Bắt buộc phải có constructor rỗng
@AllArgsConstructor // Constructor đủ tham số để bạn dùng lệnh "new ProductCategoryId(idProduct, idCategory)"
@Getter
@Setter
@EqualsAndHashCode  // BẮT BUỘC: Thiếu cái này sẽ bị báo lỗi khi dùng existsById hoặc findById
@Embeddable
public class ProductCategoryId implements Serializable {

    @Column(name = "id_product")
    private Integer idProduct;

    @Column(name = "id_category")
    private Integer idCategory;
}
