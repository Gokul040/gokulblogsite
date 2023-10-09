package com.Blog.Blog.Batch.config;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;


@Component
public interface JobListener extends JobExecutionListener {


        default void beforeJob(JobExecution jobExecution){
            if (jobExecution.getStatus() == BatchStatus.COMPLETED ) {
                //job success
            }
            else if (jobExecution.getStatus() == BatchStatus.FAILED) {
                //job failure
            }
        }

        default void afterJob(JobExecution jobExecution){
            if (jobExecution.getStatus() == BatchStatus.COMPLETED ) {
                //job success
            }
            else if (jobExecution.getStatus() == BatchStatus.FAILED) {
                //job failure
            }
        }

    }

