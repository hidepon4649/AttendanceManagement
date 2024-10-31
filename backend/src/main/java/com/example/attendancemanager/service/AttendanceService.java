package com.example.attendancemanager.service;

import com.example.attendancemanager.model.Attendance;
import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.AttendanceRepository;
import com.example.attendancemanager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // 出勤の記録
    public Attendance clockIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("社員が見つかりません"));
        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setClockInTime(LocalDateTime.now());
        attendance.setDate(LocalDate.now());
        return attendanceRepository.save(attendance);
    }

    // 退勤の記録
    public Attendance clockOut(Long employeeId) {
        // 退勤は、当日の出勤記録が存在する場合にのみ記録します
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("社員が見つかりません"));
        Attendance attendance = attendanceRepository.findByEmployeeAndDate(employee, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("今日の出勤記録が見つかりません"));
        attendance.setClockOutTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    // 月次レポートの取得
    public List<Attendance> getMonthlyReport(String month) {
        // month は "YYYY-MM" 形式で受け取ります
        return attendanceRepository.findByDateStartingWith(month);
    }
    public List<Attendance> getAttendanceByEmployeeId(Long employeeId) {
        // 実際のデータベース検索ロジックをここに追加します
        return attendanceRepository.findByEmployeeId(employeeId);
    }
}
