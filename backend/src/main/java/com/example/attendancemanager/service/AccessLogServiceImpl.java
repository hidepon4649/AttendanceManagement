package com.example.attendancemanager.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.jdbc.core.DataClassRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.attendancemanager.model.AccessLog;

@Service
public class AccessLogServiceImpl implements AccessLogService {

    private final JdbcTemplate jdbcTemplate;

    public AccessLogServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AccessLog> getAccessLogsByDate(String date) {
        // date は "YYYY-MM-DD" 形式で受け取ります
        // String型の日付をLocalDate型に変換
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        final String sql = """
                select
                    a.id,
                    a.class_name,
                    a.method_name,
                    a.method_params,
                    a.user_roles,
                    a.access_date,
                    a.access_time,
                    e.name as username
                from
                    access_log a,
                    employee e
                where
                    a.access_date = ?
                    and
                    a.username = e.email
                order by
                    a.access_date, a.access_time desc
                """;

        return jdbcTemplate.query(
                sql,
                new DataClassRowMapper<>(AccessLog.class),
                localDate.toString());

    }

}
