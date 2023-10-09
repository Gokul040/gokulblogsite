package com.Blog.Blog.repository;

import com.Blog.Blog.entity.BlogList;
import com.Blog.Blog.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogListRepo extends JpaRepository<BlogList,Long> {

    Optional<BlogList> findByBlogTitle(String blogTitle);

    List<BlogList> findByCategory(Category category);

    List<BlogList> findByCategoryId(Long id);
}
