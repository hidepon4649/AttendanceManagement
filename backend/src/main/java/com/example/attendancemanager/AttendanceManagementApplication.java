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

        // ./gradlew bootRun --args=--debug // debugモードで起動
        // ./gradlew bootRun --args=--printbeans // 標準モードで起動し、Bean名を出力

        ConfigurableApplicationContext appContext = SpringApplication.run(AttendanceManagementApplication.class, args);

        if (args.length > 0) {
            System.out.println("= SpringBootアプリ起動引数 ==========");
            Arrays.stream(args).forEach(System.out::println);
            System.out.println("===================================");
        }

        if (args.length > 0 && args[0].equals("--printbeans")) {
            printBeans(appContext);
        }

    }

    private static void printBeans(ConfigurableApplicationContext appContext) {
        System.out.println("Bean名一覧");
        System.out.println("===================================");
        Arrays.stream(appContext.getBeanDefinitionNames()).sorted().forEach(System.out::println);
        System.out.println("===================================");
    }
}
