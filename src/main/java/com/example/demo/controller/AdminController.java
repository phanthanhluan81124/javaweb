package com.example.demo.controller;

import com.example.demo.model.Category;
//import com.example.demo.repository.CategoryRepository;
//import com.example.demo.service.CategoryService;
import com.example.demo.service.CategoryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Controller
@RequestMapping("admin")
public class AdminController {
    private final CategoryService categoryService;

    public AdminController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

//    @Autowired
//    private CategoryService categoryService;

    @GetMapping("")
    public String index(){
        return "admin/index";
    }
    @GetMapping("/loadAddProduct")
    public String loadAddProduct(){
        return "admin/add_product";
    }
    @GetMapping("/category")
    public String category(Model m){
        m.addAttribute("category",categoryService.getAllCategory());
        return "admin/category";
    }

    @PostMapping("/saveCategory")
    public String saveCategory(@ModelAttribute Category category, @RequestParam("file") MultipartFile file, HttpSession session) throws IOException {
        String imageName = (file!=null && !file.isEmpty()) ? file.getOriginalFilename():"default.jpg";
        category.setImage(imageName);
        Boolean exitsCategory = categoryService.existCategory(category.getTen());
        if(exitsCategory){
            session.setAttribute("error","Tên danh mục đã toàn tại");
        }else{
            Category saveCategory = categoryService.saveCategory(category);
            if(ObjectUtils.isEmpty(saveCategory)){
                session.setAttribute("error","Thêm danh muc thất bại");
            }else{
                if (file != null && !file.isEmpty()) {
                    File saveFile = new ClassPathResource("static").getFile();

                    Path uploadDir = Paths.get(saveFile.getAbsolutePath(), "img", "category_img");

                    if (!Files.exists(uploadDir)) {
                        Files.createDirectories(uploadDir);
                    }
                    Path path = uploadDir.resolve(file.getOriginalFilename());
                    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                }

                session.setAttribute("success","Thêm danh mục thành công");

            }
        }
//        categoryService.saveCategory(category);
        return  "redirect:/admin/category";
    }

    @GetMapping("/deleteCategory/{id}")
    public String deleteCategory(@PathVariable int id,HttpSession session){
        Boolean deleteCategory = categoryService.deleteCategory(id);
        if(deleteCategory) {
            session.setAttribute("success","Xóa danh mục thành công");
        }else{
            session.setAttribute("error","Xóa danh mục thất bại");
        }
        return  "redirect:/admin/category";
    }
    @PostMapping("/updateCategory")
    public String updateCategory(@ModelAttribute Category category, @RequestParam("file") MultipartFile file,HttpSession session) throws IOException {
        Category category1 = categoryService.getCategory(category.getId());
        String imageName = file.isEmpty() ? category1.getImage():file.getOriginalFilename();
        if(!ObjectUtils.isEmpty(category1)){
            category1.setTen(category.getTen());
            category1.setImage(imageName);
        }
        Category updateCategory = categoryService.saveCategory(category1);

        if(!ObjectUtils.isEmpty(updateCategory)){
            if (file != null && !file.isEmpty()) {
                File saveFile = new ClassPathResource("static").getFile();

                Path uploadDir = Paths.get(saveFile.getAbsolutePath(), "img", "category_img");

                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path path = uploadDir.resolve(file.getOriginalFilename());
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            }
            session.setAttribute("success","Sửa danh mục thành công");
        }else{
            session.setAttribute("error","Sửa danh mục thất bại");
        }

        return  "redirect:/admin/category";
    }
}
