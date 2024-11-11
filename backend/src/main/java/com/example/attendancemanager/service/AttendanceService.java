package com.example.attendancemanager.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendancemanager.model.Attendance;
import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.AttendanceRepository;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // 出勤の記録
    @Transactional
    public Attendance clockIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("社員が見つかりません"));

        // 既に出勤記録が存在する場合はエラーとします
        Attendance tadayRecord = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now());
        if(tadayRecord != null) throw new RuntimeException("今日の出勤記録が既に存在します");
        
        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setClockInTime(LocalDateTime.now());
        attendance.setDate(LocalDate.now());
        return attendanceRepository.save(attendance);   

    }

    // 退勤の記録
    @Transactional
    public Attendance clockOut(Long employeeId) {
        // 退勤は、当日の出勤記録が存在する場合にのみ記録します
        employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("社員が見つかりません"));
        
        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate .now());
        if(attendance == null) throw new RuntimeException("今日の出勤記録が見つかりません");

        // 既に退勤記録が存在する場合は現在時刻で上書きします
        attendance.setClockOutTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    // 月次レポートの取得
    public List<Attendance> getMonthlyReportByEmployeeId(Long employeeId, int year, int month) {
        return attendanceRepository.findByEmployeeIdAndYearAndMonth(employeeId, year, month);
    }
}
