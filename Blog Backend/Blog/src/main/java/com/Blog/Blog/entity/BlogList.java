package com.Blog.Blog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blog_list")
public class BlogList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "blog_title")
    private String blogTitle;

    @Column(name = "author")
    private String author;
    @Column(name = "author_email")
    private String authorEmail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "like_count")
    private int likeCount;

    @Column(name = "total_view")
    private int totalView;

    //   Blog Images
    @Column(name="blog_image1",length =4000)
    private String blogImage1;
    @Column(name="blog_image2",length =4000)
    private String blogImage2;
    @Column(name="blog_image3",length =4000)
    private String blogImage3;

    @Column(name="sub_topic1",length =4000)
    private String subTopic1;

    @Column(name="sub_topic2",length =4000)
    private String subTopic2;

    //    Sub topic 1 Paragraph
    @Column(name="st1_paragraph1",length =4000)
    private String st1Paragraph1;
    @Column(name="st1_paragraph2",length =4000)
    private String st1Paragraph2;
    @Column(name="st1_paragraph3",length =4000)
    private String st1Paragraph3;

    //    Sub topic 2 Paragraph
    @Column(name="st2_paragraph4",length =4000)
    private String st2Paragraph4;
    @Column(name="st1_paragraph5",length =4000)
    private String st2Paragraph5;
    @Column(name="st1_paragraph6",length =4000)
    private String st2Paragraph6;

    @Lob
    @Column(name="imageData",length =4000)
    private byte[] imageData;
}
