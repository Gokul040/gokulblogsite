package com.Blog.Blog.controller;

import com.Blog.Blog.entity.Category;
import com.Blog.Blog.repository.CategoryRepo;
import com.Blog.Blog.serviceImpl.CategoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepo categoryRepo;

    @PostMapping(value = "/newCategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {

        Optional<Category> category1 = categoryRepo.findByBlogCategoryName(category.getBlogCategoryName());
        if (category1.isPresent()) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        } else {
            Category category2 = categoryService.addCategory(category);
            return new ResponseEntity<>(category2, HttpStatus.CREATED);
        }
    }

    @GetMapping("/get-one-Category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id")Long  id) {
        Optional<Category> category1 = categoryRepo.findById(id);
        if (category1.isPresent()) {
            Category category = categoryService.getByIdCategory(id);
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all-Category")
    public List<Category> getAllCategory() {
        return  categoryService.getByAllCategory();
    }

    @PutMapping("/update-Category-by-id")
    public String updateBlogById(@RequestBody Category category) {
        Optional<Category> category1 = categoryRepo.findById(category.getId());
        if(category1.isPresent()){
            categoryService.updateCategoryById(category);
            return "Success";
        }else
            return "User Not exist";
    }

    @PutMapping("/update-Category-by-name")
    public String updateBlogByName(@RequestBody Category category) {
        Optional<Category> category1 = categoryRepo.findByBlogCategoryName(category.getBlogCategoryName());
        if(category1.isPresent()){
            categoryService.updateCategoryByBlogName(category);
            return "Success";
        }else
            return "User Not exist";
    }

    @DeleteMapping("/delete-Category/{id}")
    public String deleteBlogById(@PathVariable("id") Long id) {
        Optional<Category> category = categoryRepo.findById(id);
        if(category.isPresent()){
            categoryService.deleteCategory(id);
            return "Delete Successful";
        }else
            return "Blog Not found";
    }
}
