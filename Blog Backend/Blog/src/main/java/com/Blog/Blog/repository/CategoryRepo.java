package com.Blog.Blog.repository;

import com.Blog.Blog.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {


  Optional<Category> findByBlogCategoryName(String blogCategoryName);
}
