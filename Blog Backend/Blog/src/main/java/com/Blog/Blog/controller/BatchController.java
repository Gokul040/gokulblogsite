package com.Blog.Blog.controller;

import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/batch")
@CrossOrigin(origins = "http://localhost:4200")
public class BatchController {

    @Autowired
    private JobLauncher jobLauncher;
    @Autowired
    private Job job;
    public final String TEMP_STORAGE = "C://Users//gs1-gokulr//Documents//";


    @PostMapping("/importBatch")
    public void importCsvToDBJob(@RequestParam("file") MultipartFile multipartFile) {

        try {
            String originalFileName = multipartFile.getOriginalFilename();
            File fileToImport = new File(TEMP_STORAGE + originalFileName);
            multipartFile.transferTo(fileToImport);

            JobParameters jobParameters = new JobParametersBuilder()
                    .addString("fullPathFileName", fileToImport.getAbsolutePath())
                    .addLong("startAt", System.currentTimeMillis()).toJobParameters();

             jobLauncher.run(job, jobParameters);

        } catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException | JobParametersInvalidException |
                 IOException e) {

            e.printStackTrace();
        }
    }
}

