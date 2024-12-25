package com.example.attendancemanager.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendancemanager.model.Attendance;
import com.example.attendancemanager.model.Employee;
import com.example.attendancemanager.repository.AttendanceRepository;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class AttendanceService {

    // 日本時間を明示的に設定
    private ZoneId japanZoneId = ZoneId.of("Asia/Tokyo");

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // 出勤の記録
    @Transactional
    public Attendance clockIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("社員が見つかりません"));

        // 既に出勤記録が存在する場合はエラーとします
        Attendance tadayRecord = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now(japanZoneId));
        if (tadayRecord != null)
            throw new RuntimeException("今日の出勤記録が既に存在します");

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setClockInTime(LocalDateTime.now(japanZoneId));
        attendance.setDate(LocalDate.now(japanZoneId));
        return attendanceRepository.save(attendance);

    }

    // 退勤の記録
    @Transactional
    public Attendance clockOut(Long employeeId) {
        // 退勤は、当日の出勤記録が存在する場合にのみ記録します
        employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("社員が見つかりません"));

        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now(japanZoneId));
        if (attendance == null)
            throw new RuntimeException("今日の出勤記録が見つかりません");

        // 既に退勤記録が存在する場合は現在時刻で上書きします
        attendance.setClockOutTime(LocalDateTime.now(japanZoneId));
        return attendanceRepository.save(attendance);
    }

    // 備考の記録
    @Transactional
    public Attendance remarks(Long employeeId, String date, String remarks) {

        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeId);
        if (!optionalEmployee.isPresent()) {
            throw new RuntimeException("社員が見つかりません");
        }
        Employee employee = optionalEmployee.get();

        // String型の日付をLocalDate型に変換
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        // 当日の出勤記録が存在しない場合は新規作成し、存在する場合は更新します
        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, localDate);
        if (attendance == null) {
            attendance = new Attendance();
            attendance.setEmployee(employee);
            attendance.setDate(localDate);
        }

        attendance.setRemarks(remarks);
        return attendanceRepository.save(attendance);
    }

    // 月次レポートの取得
    public List<Attendance> getMonthlyReportByEmployeeId(Long employeeId, int year, int month) {
        return attendanceRepository.findByEmployeeIdAndYearAndMonth(employeeId, year, month);
    }
}
