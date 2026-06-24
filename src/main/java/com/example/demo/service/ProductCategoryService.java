package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.model.Product_Category;

import java.util.List;

public interface ProductCategoryService {

    // Hàm lưu (Thêm mới hoặc cập nhật)
    Product_Category saveProductCategory(Product_Category productCategory);

    // Hàm lấy toàn bộ danh sách kèm liên kết
    List<Product_Category> getAllProductCategory();

    // Hàm kiểm tra tồn tại
    Boolean existProductCategory(Integer idProduct, Integer idCategory);

    // Hàm xóa liên kết
    Boolean deleteProductCategory(Integer idProduct, Integer idCategory);
}
