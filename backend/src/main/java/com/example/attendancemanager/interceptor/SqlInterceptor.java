package com.example.attendancemanager.interceptor;

import org.hibernate.resource.jdbc.spi.StatementInspector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class SqlInterceptor implements StatementInspector {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String inspect(String sql) {
        // SQL文をログに記録
        String username = "Anonymous"; // デフォルト値
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            username = ((UserDetails) authentication.getPrincipal()).getUsername();
        }

        LocalDateTime timestamp = LocalDateTime.now();
        String logSql = "INSERT INTO sql_logs (username, timestamp, sql_str) VALUES (?, ?, ?)";
        jdbcTemplate.update(logSql, username, timestamp, sql);

        return sql;
    }
}