package com.Blog.Blog.Batch.config;

import com.Blog.Blog.entity.Category;
import com.Blog.Blog.repository.CategoryRepo;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class BlogItemWriter implements ItemWriter<Category> {

    @Autowired
    private CategoryRepo repository;

    public BlogItemWriter(CategoryRepo repository) {
        this.repository = repository;
    }

    @Override
    public void write(@NonNull Chunk<? extends Category> chunk) throws Exception {
       System.out.println("Writer Thread "+Thread.currentThread().getName());
       repository.saveAll(chunk);

    }

//    @Override
//    public void write(List<? extends Customer> list) throws Exception {
//        System.out.println("Writer Thread "+Thread.currentThread().getName());
//        repository.saveAll(list);
//    }

    // @Override
    // public void write(Chunk<? extends AssetLocation> chunk) throws Exception {
    //     System.out.println("Writer Thread "+Thread.currentThread().getName());
    //     repository.saveAll(chunk);
    // }
}
