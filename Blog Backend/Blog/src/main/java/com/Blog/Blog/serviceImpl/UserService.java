package com.Blog.Blog.serviceImpl;

import com.Blog.Blog.entity.RefreshToken;
import com.Blog.Blog.entity.User;
import com.Blog.Blog.exception.UserAlreadyExistsException;
import com.Blog.Blog.registration.RegistrationRequest;
import com.Blog.Blog.repository.PasswordResetRepository;
import com.Blog.Blog.registration.password.PasswordResetService;
import com.Blog.Blog.registration.password.PasswordResetToken;
import com.Blog.Blog.registration.token.VerificationToken;
import com.Blog.Blog.repository.VerificationTokenRepository;
import com.Blog.Blog.repository.RefreshTokenRepository;
import com.Blog.Blog.repository.UserRepository;
//import com.AMS.AssetManagement.security.password.PasswordResetService;
import com.Blog.Blog.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Component
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordResetService passwordResetService;

    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetRepository passwordResetRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }


    @Override
    public User registerUser(RegistrationRequest request) {
        Optional<User> user = this.findByEmail(request.email());
        if(user.isPresent()){
            throw new UserAlreadyExistsException("User with email "+request.email()+" already exists!");
        }
        var newUser = new User();
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setEmail(request.email());
        newUser.setPassword(request.password());
        newUser.setContact(request.contact());
        newUser.setProfileImage(request.profileImage());
        newUser.setRole(request.role());
        return  userRepository.save(newUser) ;
    }

    public Optional<User> retrieveOne(String email){
        return userRepository.findByEmail(email);
    }

    public Optional<User> update(User user){
        if (userRepository.existsById(user.getId())){
            return Optional.of(userRepository.save(user));
        }else{
            return Optional.empty();
        }
    }
    public User updateUser(User user){

        User users = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        users.setId(users.getId());
        users.setEmail(users.getEmail());
        users.setFirstName(user.getFirstName());
        users.setLastName(user.getLastName());
        users.setRole(user.getRole());
        users.setPassword(users.getPassword());
        users.setEnabled(user.isEnabled());
        users.setContact(user.getContact());
        users.setProfileImage(user.getProfileImage());
        userRepository.save(users);
        return users ;
    }
    public String updateImage(Long id,String img){
     Optional<User> user = userRepository.findById(id);
     user.get().setProfileImage(img);
     userRepository.save(user.get());
     return "Success";
    }

    public String delete(Long id){

        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        VerificationToken verificationToken =tokenRepository.findByUserId(id);
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(id);
        PasswordResetToken passwordResetToken = passwordResetRepository.findByUserId(id);

        if(!(verificationToken == null)){
            tokenRepository.delete(verificationToken);
        }
        if(!(refreshToken == null)){
           refreshTokenRepository.delete(refreshToken);
        }
        if(!(passwordResetToken == null)){
            passwordResetRepository.delete(passwordResetToken);
        }

        userRepository.delete(user);
       return "Delete Successful";
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void saveUserVerificationToken(User theUser, String token) {
        var verificationToken = new VerificationToken(token,theUser);
        tokenRepository.save(verificationToken);
    }

    @Override
    public String validateToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if(token == null){
            return "Invalid verification token ";
        }
        User user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0){
//            tokenRepository.delete(token);
            return "Verification link already expired," + " Please click the link below to receive a new verification link";
        }
        user.setEnabled(true);
        userRepository.save(user);
        return "Valid";

    }

    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        VerificationToken verificationToken = tokenRepository.findByToken(oldToken);
        var verificationTokenTime = new VerificationToken();
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setExpirationTime(verificationTokenTime.getTokenExpirationTime());
        return tokenRepository.save(verificationToken);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String passwordToken) {
        passwordResetService.createPasswordResetTokenForUser(user, passwordToken);
    }

    @Override
    public String validatePasswordResetToken(String passwordResetToken) {
        return passwordResetService.validatePasswordResetToken(passwordResetToken);
    }

    @Override
    public User findUserByPasswordToken(String passwordResetToken) {
        return passwordResetService.findUserByPasswordToken(passwordResetToken).get();
    }

    @Override
    public void resetUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

//
//    public String profilePhoto(byte[] bytes,Long id){
//      Optional<User> user = userRepository.findById(id);
//      user.get().setProfileImage(bytes);
//      userRepository.save(user.get());
//      return "Success!!";
//    }
//
//    public Optional<User> retrieveOnePhoto(Long id){
//      return userRepository.findById(id);
//    }

}
