package com.example.attendancemanager.controller;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Import;

@Import(AbstractControllerTest.SecurityBypassConfig.class)
public abstract class AbstractControllerTest {

    /**
     * セキュリティ設定をバイパスするための設定クラス
     */
    @TestConfiguration
    static class SecurityBypassConfig {
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.csrf().disable()
                    .authorizeHttpRequests(authz -> authz.anyRequest().permitAll());
            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
}