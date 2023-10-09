package com.Blog.Blog.serviceImpl;

import com.Blog.Blog.entity.BlogList;
import com.Blog.Blog.entity.User;
import com.Blog.Blog.repository.BlogListRepo;
import com.Blog.Blog.repository.CategoryRepo;
import com.Blog.Blog.repository.UserRepository;
import com.Blog.Blog.service.lCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.Blog.Blog.entity.Category;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CategoryService  {
    @Autowired
    private BlogListRepo blogListRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private UserRepository userRepository;

    public List<Category> getByAllCategory(){
        List<Category> category = categoryRepo.findAll();
        return category;
    }

    public Category getByIdCategory(Long id){
        Optional<Category> category = categoryRepo.findById(id);
        return category.get();
    }

    public Category addCategory(Category category){
        Category category1 = categoryRepo.save(category);
        return category1;
    }

    public Category updateCategoryById(Category category){
        Optional<Category> category1 = categoryRepo.findById(category.getId());
        category1.get().setBlogCategoryName(category.getBlogCategoryName());
        category1.get().setCategoryImage(category.getCategoryImage());
        Category category2 = categoryRepo.save(category1.get());
        return category2;
    }
    public Category updateCategoryByBlogName(Category category){
        Optional<Category> category1 = categoryRepo.findByBlogCategoryName(category.getBlogCategoryName());
        category1.get().setBlogCategoryName(category.getBlogCategoryName());
        category1.get().setCategoryImage(category.getCategoryImage());
        Category category2 = categoryRepo.save(category1.get());
        return category2;
//        for(int i = 0;i<category.getBlogLists().size();i++){
//            BlogList blogList = new BlogList();
//            blogList.setCategory(category);
//            Optional<User> user = userRepository.findByEmail(category.getBlogLists().get(i).getAuthorEmail());
//            blogList.setAuthor(user.get().getFirstName());
//            blogList.setAuthorEmail(user.get().getEmail());
//            blogList.setCategory(category1.get());
//            blogList.setCreatedDate(new Date());
//            blogList.setAuthor(user.get().getFirstName());
//            blogList.setLikeCount(category.getBlogLists().get(i).getLikeCount());
//            blogList.setTotalView(category.getBlogLists().get(i).getTotalView());
//            blogList.setBlogImage1(category.getBlogLists().get(i).getBlogImage1());
//            blogList.setBlogImage2(category.getBlogLists().get(i).getBlogImage2());
//            blogList.setBlogImage3(category.getBlogLists().get(i).getBlogImage3());
//            blogList.setSubTopic1(category.getBlogLists().get(i).getSubTopic1());
//            blogList.setSubTopic2(category.getBlogLists().get(i).getSubTopic2());
//
//            blogList.setSt1Paragraph1(category.getBlogLists().get(i).getSt1Paragraph1());
//            blogList.setSt1Paragraph2(category.getBlogLists().get(i).getSt1Paragraph2());
//            blogList.setSt1Paragraph3(category.getBlogLists().get(i).getSt1Paragraph3());
//
//            blogList.setSt2Paragraph4(category.getBlogLists().get(i).getSt2Paragraph4());
//            blogList.setSt2Paragraph5(category.getBlogLists().get(i).getSt2Paragraph5());
//            blogList.setSt2Paragraph6(category.getBlogLists().get(i).getSt2Paragraph6());
//            category1.get().getBlogLists().get(i).setAuthor(user.get().getFirstName());
//            category1.get().getBlogLists().get(i).setAuthorEmail(user.get().getEmail());
//            category1.get().getBlogLists().get(i).setCategory(category1.get());
//            category1.get().getBlogLists().get(i).setCreatedDate(new Date());

    }

    public String  deleteCategory(Long id){
        Optional<Category> category = categoryRepo.findById(id);
        categoryRepo.delete(category.get());
        return "Category Deleted Successful";
    }

}
