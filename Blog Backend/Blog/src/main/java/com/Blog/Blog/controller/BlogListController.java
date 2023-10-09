package com.Blog.Blog.controller;

import com.Blog.Blog.entity.BlogList;

import com.Blog.Blog.entity.Category;
import com.Blog.Blog.entity.User;
import com.Blog.Blog.repository.BlogListRepo;

import com.Blog.Blog.repository.CategoryRepo;
import com.Blog.Blog.repository.UserRepository;
import com.Blog.Blog.serviceImpl.BlogListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200",maxAge = 3600)
@RequestMapping("/blog")
public class BlogListController {

    @Autowired
    private BlogListService blogService;
    @Autowired
    private BlogListRepo blogRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/newBlog")
    public ResponseEntity<Category> addBlog(@RequestBody BlogList blog) throws IOException {
        Optional<User> user = userRepository.findByEmail(blog.getAuthorEmail());
        Optional<Category> category = categoryRepo.findByBlogCategoryName(blog.getCategory().getBlogCategoryName());
        System.out.println(category.get());
        if(category.isPresent() && user.isPresent()){
            String blogList = blogService.addBlog(blog);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get-one-blog/{id}")
    public ResponseEntity<BlogList> getBlogById(@PathVariable("id")Long  id) {
        Optional<BlogList> blogList1 = blogRepo.findById(id);
        if (blogList1.isPresent()) {
            BlogList blogList = blogService.getBlogById(id);
            return new ResponseEntity<>(blogList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all-blog")
    public List<BlogList> getAllBlog() {
        return  blogService.getBlogs();
    }


    @GetMapping("/get-blogs-category/{id}")
    public List<BlogList> getAllBlogByCategoryId(@PathVariable("id") Long id) {
            return  blogService.getBlogByCategoryName(id);
    }

    @PutMapping("/update-blog")
    public String updateBlog(@RequestBody BlogList blogList) {
        Optional<BlogList> blogList1 = blogRepo.findById(blogList.getId());
        if(blogList1.isPresent()){
            blogService.updateBlog(blogList);
            return "Success";
        }else
            return "User Not exist";
    }

    @DeleteMapping("/delete-blog/{id}")
    public String deleteBlogById(@PathVariable("id") Long id) {
        Optional<BlogList> blogList1 = blogRepo.findById(id);
        if(blogList1.isPresent()){
            blogService.deleteBlog(id);
            return "Delete Successful";
        }else
            return "Blog Not found";
    }

}
