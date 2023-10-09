package com.Blog.Blog.repository;

import com.Blog.Blog.registration.password.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PasswordResetRepository extends JpaRepository<PasswordResetToken,Long> {
    PasswordResetToken findByToken(String theToken);
    PasswordResetToken findByTokenId(Long id);
   PasswordResetToken findByUserId(Long id);
}
