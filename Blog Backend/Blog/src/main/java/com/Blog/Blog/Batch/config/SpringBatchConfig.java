package com.Blog.Blog.Batch.config;

import com.Blog.Blog.entity.Category;
import com.Blog.Blog.repository.CategoryRepo;
import lombok.AllArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.skip.SkipPolicy;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

import java.io.File;

@Configuration
@AllArgsConstructor
public class SpringBatchConfig {


    @Autowired(required=false)
    private CategoryRepo assetDetailsRepository;
    @Autowired(required=false)
    private BlogItemWriter assetItemWriter;

    @Bean
    @StepScope
    public FlatFileItemReader<Category> itemReader(@Value("#{jobParameters[fullPathFileName]}") String pathToFIle) {
        FlatFileItemReader<Category> flatFileItemReader = new FlatFileItemReader<>();
        flatFileItemReader.setResource(new FileSystemResource(new File(pathToFIle)));
        flatFileItemReader.setName("CSV-Reader");
        flatFileItemReader.setLinesToSkip(1);
        flatFileItemReader.setLineMapper(lineMapper());
        return flatFileItemReader;
    }


    private LineMapper<Category> lineMapper() {
        DefaultLineMapper<Category> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("id", "placeId");
        //lineTokenizer.setNames("id", "firstName", "lastName", "email", "gender", "contactNo", "country", "dob");
        BeanWrapperFieldSetMapper<Category> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Category.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }

    @Bean
    public BlogProcessor processor() {
        return new BlogProcessor();
    }

    @Bean
    public RepositoryItemWriter<Category> writer() {
        RepositoryItemWriter<Category> writer = new RepositoryItemWriter<>();
        writer.setRepository(assetDetailsRepository);
        writer.setMethodName("save");
        return writer;
    }
    @Bean
    public Step step1(FlatFileItemReader<Category> itemReader, JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("slave step",jobRepository).
                <Category, Category>chunk(10,transactionManager)
                .reader(itemReader)
                .processor( processor())
                .writer(assetItemWriter)
                .faultTolerant()
                .listener(skipListener())
                .skipPolicy(skipPolicy())
                .taskExecutor(taskExecutor())
                .build();
    }


    @Bean
    public Job runJob(FlatFileItemReader<Category> itemReader, JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new JobBuilder("location",jobRepository)
                .flow(step1(itemReader,jobRepository,transactionManager)).end().build();
    }


    @Bean
    public SkipPolicy skipPolicy() {

        return new ExceptionSkipPolicy();
    }

 
    @Bean
    public StepSkipListener skipListener() {

        return new StepSkipListener();
    }

    @Bean
    public TaskExecutor taskExecutor() {
        SimpleAsyncTaskExecutor taskExecutor = new SimpleAsyncTaskExecutor();
        taskExecutor.setConcurrencyLimit(5);
        return taskExecutor;
    }
}
