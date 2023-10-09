package com.Blog.Blog.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    @NaturalId(mutable = true)
    private String email;
    @Column
    private String password;
    @Column
    private String contact;
    @Column
    private String role;
    @Column
    private boolean isEnabled = false;
    @Column
    private String otp;
    @Column
    private LocalDateTime otpGeneratedTime;
    @Column
    private String profileImage;


    public String getEmail() {
        return email;
    }
}
