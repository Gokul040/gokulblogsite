package com.Blog.Blog.serviceImpl;


import com.Blog.Blog.entity.BlogList;
import com.Blog.Blog.entity.Category;
import com.Blog.Blog.entity.User;
import com.Blog.Blog.repository.CategoryRepo;

import com.Blog.Blog.repository.BlogListRepo;
import com.Blog.Blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class BlogListService {

    @Autowired
    private BlogListRepo blogListRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private UserRepository userRepository;


    public String addBlog(BlogList blog) throws IOException {

        Optional<User> user = userRepository.findByEmail(blog.getAuthorEmail());
        Optional<Category> category = categoryRepo.findByBlogCategoryName(blog.getCategory().getBlogCategoryName());

        if(user.isPresent() && category.isPresent()){
            blog.setAuthorEmail(user.get().getEmail());
            blog.setAuthor(user.get().getFirstName());
            blog.setCreatedDate(new Date());
            blog.setCategory(category.get());

            blogListRepo.save(blog);
            return "success";
        } else
               return "retry";
    }

    public BlogList updateBlog(BlogList blog) {
        Optional<BlogList> blogList = blogListRepo.findById(blog.getId());


        Date date = new Date();

        blogList.get().setUpdatedDate(date);
        blogList.get().setBlogTitle(blog.getBlogTitle());
        blogList.get().setAuthor(blogList.get().getAuthor());
        blogList.get().setCreatedDate(blogList.get().getCreatedDate());
        blogList.get().setLikeCount(blog.getLikeCount());
        blogList.get().setTotalView(blog.getTotalView());
        blogList.get().setBlogImage1(blog.getBlogImage1());
        blogList.get().setBlogImage2(blog.getBlogImage2());
        blogList.get().setBlogImage3(blog.getBlogImage3());
        blogList.get().setSubTopic1(blog.getSubTopic1());
        blogList.get().setSubTopic2(blog.getSubTopic2());

        Optional<Category> category = categoryRepo.findByBlogCategoryName(blog.getCategory().getBlogCategoryName());
        blogList.get().setCategory(category.get());

        blogList.get().setSt1Paragraph1(blog.getSt1Paragraph1());
        blogList.get().setSt1Paragraph2(blog.getSt1Paragraph2());
        blogList.get().setSt1Paragraph3(blog.getSt1Paragraph3());

        blogList.get().setSt2Paragraph4(blog.getSt2Paragraph4());
        blogList.get().setSt2Paragraph5(blog.getSt2Paragraph5());
        blogList.get().setSt2Paragraph6(blog.getSt2Paragraph6());


        return blogListRepo.save(blogList.get());
    }

    public BlogList getBlogById(Long id) {
        Optional<BlogList> blogList = blogListRepo.findById(id);
        return blogList.get();
    }

    public List<BlogList> getBlogByCategoryName(Long id) {
        List<BlogList> blogList = blogListRepo.findByCategoryId(id);
        return blogList;
    }

    public List<BlogList> getBlogs(){
        return blogListRepo.findAll();
    }

    public String deleteBlog(Long id){
        Optional<BlogList> blog = blogListRepo.findById(id);
        blogListRepo.delete(blog.get());
        return "Deleted Successful";
    }

}
