package com.Blog.Blog.registration.password;

import com.Blog.Blog.entity.User;
import com.Blog.Blog.repository.PasswordResetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetRepository passwordResetRepository;

    public void createPasswordResetTokenForUser(User user, String passwordToken){
        PasswordResetToken passwordResetToken = new PasswordResetToken(passwordToken,user);
        passwordResetRepository.save(passwordResetToken);
    }

    public String validatePasswordResetToken(String theToken) {
        PasswordResetToken token = passwordResetRepository.findByToken(theToken);
        if(token == null){
            return "Invalid password reset link.";
        }
        token.getUser();
        Calendar calendar = Calendar.getInstance();
        if((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0){
            passwordResetRepository.delete(token);
            return "Link already expired , resend link" ;
        }
        return "Valid";
    }

    public Optional<User> findUserByPasswordToken(String passwordToken){
        return Optional.ofNullable(passwordResetRepository.findByToken(passwordToken).getUser());
    }



}
