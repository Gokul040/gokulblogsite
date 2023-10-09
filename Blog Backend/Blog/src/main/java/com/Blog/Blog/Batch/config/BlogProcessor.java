package com.Blog.Blog.Batch.config;

import com.Blog.Blog.entity.Category;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class BlogProcessor implements ItemProcessor<Category, Category> {

    @Override
    @Nullable
    public Category process(@NonNull Category item) throws Exception {
         return null;
    //     throw new UnsupportedOperationException("Unimplemented method 'process'");
     }

    // @Override
    // public AssetLocation process(AssetLocation item) throws Exception {
    //     return null;
    // }
}
