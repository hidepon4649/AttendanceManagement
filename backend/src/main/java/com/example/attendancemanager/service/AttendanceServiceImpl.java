package com.example.attendancemanager.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.attendancemanager.entity.Attendance;
import com.example.attendancemanager.entity.Employee;
import com.example.attendancemanager.repository.AttendanceRepository;
import com.example.attendancemanager.repository.EmployeeRepository;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    // 日本時間を明示的に設定
    private ZoneId japanZoneId = ZoneId.of("Asia/Tokyo");

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
            EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    // 出勤の記録
    @Override
    @Transactional
    public Attendance clockIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "社員が見つかりません:" + employeeId));

        // 既に出勤記録が存在する場合はエラーとします
        attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now(japanZoneId))
                .ifPresent((data) -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "今日の出勤記録が既に存在します:" + data);
                });

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setClockInTime(LocalDateTime.now(japanZoneId));
        attendance.setDate(LocalDate.now(japanZoneId));
        return attendanceRepository.save(attendance);

    }

    // 退勤の記録
    @Override
    @Transactional
    public Attendance clockOut(Long employeeId) {
        // 退勤は、当日の出勤記録が存在する場合にのみ記録します
        employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "社員が見つかりません:" + employeeId));

        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, LocalDate.now(japanZoneId))
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "今日の出勤記録が見つかりません");
                });

        // 既に退勤記録が存在する場合は現在時刻で上書きします
        attendance.setClockOutTime(LocalDateTime.now(japanZoneId));
        return attendanceRepository.save(attendance);
    }

    // 備考の記録
    @Override
    @Transactional
    public Attendance remarks(Long employeeId, String date, String remarks) {
        return add(employeeId, date, remarks);
    }

    // 勤怠の追加
    @Override
    @Transactional
    public Attendance add(Long employeeId, String date) {
        return add(employeeId, date, null);
    }

    // 勤怠の追加
    @Override
    @Transactional
    public Attendance add(Long employeeId, String date, String remarks) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "社員が見つかりません:" + employeeId);
                });

        // String型の日付をLocalDate型に変換
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(employeeId, localDate)
                .orElseGet(() -> {
                    Attendance at = new Attendance();
                    at.setEmployee(employee);
                    at.setDate(localDate);
                    // 出勤時間,退勤時間,休憩時間を0で初期化
                    at.setClockInTime(LocalDateTime.of(localDate, LocalTime.of(0, 0)));
                    at.setClockOutTime(LocalDateTime.of(localDate, LocalTime.of(0, 0)));
                    at.setBreakMinutes(0);
                    return at;
                });

        // 備考の設定
        if (remarks != null) {
            attendance.setRemarks(remarks);
        }

        return attendanceRepository.save(attendance);

    }

    // 打刻の修正
    @Override
    @Transactional
    public Attendance edit(Long attendanceId, String newClockInTime, String newClockOutTime, int breakMinutes) {

        // 当日の勤怠記録が存在しない場合はエラー
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "修正対象日の勤怠が見つかりません");
                });

        // 打刻時間の更新
        if (newClockInTime != null) {
            attendance.setClockInTime(LocalDateTime.parse(newClockInTime));
        }
        if (newClockOutTime != null) {
            attendance.setClockOutTime(LocalDateTime.parse(newClockOutTime));
        }
        attendance.setBreakMinutes(breakMinutes);

        return attendanceRepository.save(attendance);
    }

    // 勤怠記録の削除
    @Override
    @Transactional
    public Attendance delete(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "削除対象日の勤怠が見つかりません");
                });
        attendanceRepository.deleteById(attendanceId);

        return attendance;
    }

    // 月次レポートの取得
    @Override
    public List<Attendance> getMonthlyReportByEmployeeId(Long employeeId, int year, int month) {
        return attendanceRepository.findByEmployeeIdAndYearAndMonth(employeeId, year, month)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "月次レポートが見つかりません"));
    }
}
