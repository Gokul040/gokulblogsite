package com.Blog.Blog.controller;

import com.Blog.Blog.entity.ForgotPassword;
import com.Blog.Blog.event.RegistrationCompleteEvent;
import com.Blog.Blog.event.listener.RegistrationCompleteEventListener;
import com.Blog.Blog.registration.RegistrationRequest;
import com.Blog.Blog.registration.password.PasswordResetRequest;
import com.Blog.Blog.registration.token.VerificationToken;
import com.Blog.Blog.repository.VerificationTokenRepository;
import com.Blog.Blog.entity.User;
import com.Blog.Blog.repository.UserRepository;
import com.Blog.Blog.serviceImpl.ForgotPasswordService;
import com.Blog.Blog.serviceImpl.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/register")
public class RegistrationController {

    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenRepository tokenRepository;
    private final RegistrationCompleteEventListener eventListener;
    private final HttpServletRequest servletRequest;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ForgotPasswordService forgotPasswordService;


    @PostMapping("/newuser")
    public String registerUser(@RequestBody RegistrationRequest registrationRequest, final HttpServletRequest request){
        User user = userService.registerUser(registrationRequest);
        publisher.publishEvent(new RegistrationCompleteEvent(user,applicationUrl(request)));
        return "Success! Please Check Your Email to Confirm Registration";
    }

    @GetMapping("/get-user/{email}")
    public ResponseEntity<User> getUserById(@PathVariable("email") String email) {
        Optional<User> getOneUser = userService.retrieveOne(email);
        if (getOneUser.isPresent()) {
            return new ResponseEntity<>(getOneUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-user")
    public List<User> getAllUser() {
        return userService.getUsers();
    }

    @PutMapping("/update-profile")
    public String updateProfile(@RequestBody User user) {

        Optional<User> checkUser = userRepository.findByEmail(user.getEmail());

        var newUser = new User();
        newUser.setId(checkUser.get().getId());
        newUser.setFirstName(checkUser.get().getFirstName());
        newUser.setLastName(checkUser.get().getLastName());
        newUser.setEmail(checkUser.get().getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setContact(checkUser.get().getContact());
        newUser.setRole(user.getRole());
        newUser.setProfileImage(user.getProfileImage());
        if (checkUser.get().isEnabled() == true){
            newUser.setEnabled(true);
        }else {
            newUser.setEnabled(false);
        }
        Optional<User> _getOneUser = userService.update(newUser);
        if (_getOneUser.isPresent()) {
            return "Password has been updated successfully!";
        } else {
            return "Email Id does not exist in records!";
        }
    }
    @PutMapping("/update-image/{id}/{image}")
    public String updateImage(@PathVariable(value = "id")Long id, @PathVariable(value = "image")String img) {
    return  userService.updateImage(id,img);
  }

  @PutMapping("/update-user")
    public User updateUser(@RequestBody User user) {
        return  userService.updateUser(user);
    }

    @DeleteMapping("/delete-user/{id}")
    public String deleteUserById(@PathVariable(value = "id") Long id) {
        return  userService.delete(id);
    }

    @GetMapping("/verifyEmail")
    public String verifyEmail(@RequestParam("token")  String token){

        String url = applicationUrl(servletRequest)+"/register/resend-verificationEmail?token="+token;

        VerificationToken theToken = tokenRepository.findByToken(token);
        if (theToken.getUser().isEnabled()){
            return "This account has already been verified! please login.";
        }
        String verificationResult = userService.validateToken(token);
        if (verificationResult.equalsIgnoreCase("valid")){
            return "Email verified successfully. Now you can login your account.";
        }
        return "Invalid verification link, <a href=\"" +url+"\"> Get a new verification link. </a>";
    }

    @GetMapping("/resend-verificationEmail")
    public String resendVerificationToken(@RequestParam("token") String oldToken,final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        VerificationToken verificationToken = userService.generateNewVerificationToken(oldToken);
        User theUser = verificationToken.getUser();
        resendVerificationTokenEmail(theUser,applicationUrl(request),verificationToken);
        return "A new verification link has been sent to your email," +
                " please, check to activate your account";
    }

    private void resendVerificationTokenEmail(User theUser, String applicationUrl, VerificationToken verificationToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl+"/register/verifyEmail?token="+verificationToken.getToken();
        eventListener.sendVerificationEmail(url);
        log.info("Click the link to verify your Registration : {}", url);
    }

    @PostMapping("/password-reset-request")
    public String resetPasswordRequest(@RequestBody PasswordResetRequest passwordResetRequest, final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        Optional<User> user = userService.findByEmail(passwordResetRequest.getEmail());
        String passwordResetUrl = "";
        if (user.isPresent()){
            String passwordResetToken = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user.get(),passwordResetToken);
            passwordResetUrl = passwordResetEmailLink(user.get(),applicationUrl(request),passwordResetToken);
        }
        return passwordResetUrl;
    }

    private String passwordResetEmailLink(User user, String applicationUrl, String passwordResetToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl+"/register/reset-password?token="+passwordResetToken;
        String userEmail = user.getEmail();
        String userName = user.getFirstName();
        eventListener.sendPasswordResetVerificationEmail(url,userEmail,userName);
        log.info("Click the link to reset your password : {}",url);
        return url;
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody PasswordResetRequest passwordResetRequest, @RequestParam("token") String passwordResetToken){
        String tokenValidationResult = userService.validatePasswordResetToken(passwordResetToken);
        if (!tokenValidationResult.equalsIgnoreCase("valid")){
            return "Invalid password reset Link";
        }
        User user = userService.findUserByPasswordToken(passwordResetToken);
        if (user != null){
            userService.resetUserPassword(user, passwordResetRequest.getNewPassword());
            return "Password has been reset successfully";
        }
        return  "Invalid password reset link";
    }

    public String applicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<String> register(@RequestBody ForgotPassword forgotPassword) {
        return new ResponseEntity<>(forgotPasswordService.resetPassword(forgotPassword), HttpStatus.OK);
    }
    @PutMapping("/verify-account")
    public ResponseEntity<String> verifyAccount(@RequestBody ForgotPassword forgotPassword) {
        return new ResponseEntity<>(forgotPasswordService.verifyAccount(forgotPassword), HttpStatus.OK);
    }
    @PutMapping("/regenerate-otp")
    public ResponseEntity<String> regenerateOtp(@RequestBody ForgotPassword email) {
        return new ResponseEntity<>(forgotPasswordService.regenerateOtp(email), HttpStatus.OK);
    }

//    @PostMapping("/profile-photos/{userId}")
//    public String storeProfilePhoto(@RequestParam("file") MultipartFile file, @PathVariable(value = "userId") Long userId) throws IOException {
//      Optional<User> getOneUser = userRepository.findById(userId);
//      if (getOneUser.isPresent()) {
//        byte[] imageData = file.getBytes();
//        userService.profilePhoto(imageData,userId);
//        return "Success";
//      } else {
//        return "user Not found";
//      }
//    }
//
//    @GetMapping("/get-profile-photos/{userId}")
//    public byte[] getProfilePhoto(@PathVariable Long userId) {
//      Optional<User> getOneUser = userRepository.findById(userId);
//      if (getOneUser.isPresent()) {
//      Optional<User> user = userService.retrieveOnePhoto(userId);
//      return user.get().getProfileImage();
//      } else {
//        return null;
//      }
//    }
}
