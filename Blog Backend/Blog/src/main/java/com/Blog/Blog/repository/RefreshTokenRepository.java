package com.Blog.Blog.repository;

import com.Blog.Blog.entity.RefreshToken;
import com.Blog.Blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
   RefreshToken findByUserId(Long id);

    @Modifying
    int deleteByUser(User user);


}
