package com.example.attendancemanager.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.attendancemanager.model.AccessLog;
import com.example.attendancemanager.repository.AccessLogRepository;
// import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class AccessLogServiceImpl implements AccessLogService {

    private final AccessLogRepository accessLogRepository;
    // private final EmployeeRepository employeeRepository;

    public AccessLogServiceImpl(AccessLogRepository accessLogRepository
    // , EmployeeRepository employeeRepository
    ) {
        this.accessLogRepository = accessLogRepository;
        // this.employeeRepository = employeeRepository;
    }

    @Override
    public List<AccessLog> getAccessLogsByDate(String date) {
        // date は "YYYY-MM-DD" 形式で受け取ります
        // String型の日付をLocalDate型に変換
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        return accessLogRepository.findByAccessDate(localDate).orElseThrow(
                () -> new RuntimeException("指定された日付のアクセスログが見つかりません: " + date));
    }

}
