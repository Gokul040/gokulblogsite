package com.Blog.Blog;

import com.Blog.Blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepoTest extends JpaRepository<User, Long> {
}
