package com.example.attendancemanager;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class AttendanceManagementApplication {

    public static void main(String[] args) {
        // SpringApplication.run(AttendanceManagementApplication.class, args);

        ConfigurableApplicationContext appContext = SpringApplication.run(AttendanceManagementApplication.class, args);
        // Bean定義を標準出力
        Arrays.stream(appContext.getBeanDefinitionNames()).forEach(System.out::println);
    }
}
