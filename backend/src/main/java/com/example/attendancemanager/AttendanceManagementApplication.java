package com.example.attendancemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class AttendanceManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(AttendanceManagementApplication.class, args);
    }
}
