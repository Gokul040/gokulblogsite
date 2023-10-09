package com.Blog.Blog;

import com.Blog.Blog.entity.BlogList;
import com.Blog.Blog.entity.Category;
import com.Blog.Blog.entity.User;
import com.Blog.Blog.serviceImpl.BlogListService;
import com.Blog.Blog.serviceImpl.CategoryService;
import com.Blog.Blog.serviceImpl.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BlogProjectApplicationTests {

    @MockBean
    private CategoryService assetLocationService;

    @MockBean
    private BlogListService assetDetailsService;
    @MockBean
    private UserService userService;


    @Test
    public void testGetUserById() {
      String id = "gokul@mail.com";
      Optional<User> user = userService.retrieveOne(id);
      assertNotNull(user);
      assertEquals("gokul@mail.com", user.get().getEmail());
    }

    @Test
    public void testGetAllUser() {
      List<User> users = userService.getUsers();
      assertNotNull(users);
      assertTrue(users.size() > 0);
    }

    @Test
    public void testUpdateProfile() {
      User user = new User();
      user.setId(1L);
      user.setFirstName("Gokul");
      user.setLastName("R");
      user.setEmail("gokul@mail.com");
      user.setPassword("password");
      user.setContact("1234567890");
      user.setRole("USER");
      user.setEnabled(true);

      Optional<User> _getOneUser = userService.update(user);
      if (_getOneUser.isPresent()) {
        assertEquals("Password has been updated successfully!", _getOneUser.get().getPassword());
      } else {
        assertEquals("Email Id does not exist in records!", _getOneUser.get().getEmail());
      }
    }

    @Test
    public void testDeleteUserById() {
      String response = userService.delete(1L);
      assertEquals("User Deleted Successfully!", response);
    }

    @Test
    public void testVerifyEmail() {
      String token = "1234567890";
      String verificationResult = userService.validateToken(token);
      assertEquals("valid", verificationResult);
    }

}
