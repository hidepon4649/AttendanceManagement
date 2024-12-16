package com.example.attendancemanager.config;

import com.example.attendancemanager.interceptor.SqlInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
public class HibernateConfig {

    // @Autowired
    // private SqlInterceptor sqlInterceptor;

    // @Bean
    // public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource
    // dataSource) {
    // LocalContainerEntityManagerFactoryBean em = new
    // LocalContainerEntityManagerFactoryBean();
    // em.setDataSource(dataSource);
    // em.setPackagesToScan("com.example.attendancemanager.model");

    // HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    // em.setJpaVendorAdapter(vendorAdapter);
    // em.setJpaProperties(hibernateProperties());

    // return em;
    // }

    // @Bean
    // private Properties hibernateProperties() {
    // Properties properties = new Properties();
    // properties.put("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
    // properties.put("hibernate.show_sql", true);
    // properties.put("hibernate.format_sql", true);
    // properties.put("hibernate.session_factory.statement_inspector",
    // sqlInterceptor);
    // return properties;
    // }
}